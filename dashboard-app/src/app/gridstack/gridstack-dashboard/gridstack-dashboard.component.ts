import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { GridStack, GridStackNode } from 'gridstack';
import { WidgetInstance } from '../../models/dashboard.model';
import { WidgetRegistryService } from '../../registry/widget-registry.service';
import { WidgetType } from '../../models/widget.model';

const STORAGE_KEY = 'gs-dashboard-layout';

@Component({
  selector: 'app-gridstack-dashboard',
  standalone: false,
  templateUrl: './gridstack-dashboard.component.html',
  styleUrls: ['./gridstack-dashboard.component.scss']
})
export class GridstackDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('gridEl') gridEl!: ElementRef<HTMLElement>;

  editMode = false;
  widgets: WidgetInstance[] = [];
  widgetTypes: WidgetType[] = [];
  private grid!: GridStack;
  private idCounter = 1;

  constructor(
    private registry: WidgetRegistryService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.widgetTypes = this.registry.getAll();
    this.widgets = this.loadLayout();
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.grid = GridStack.init(
        {
          column: 12,
          cellHeight: 80,
          margin: 8,
          animate: true,
          float: false,
          staticGrid: true,
        },
        this.gridEl.nativeElement
      );

      this.grid.on('change', (_event: Event, items: GridStackNode[]) => {
        this.zone.run(() => {
          this.updatePositions(items);
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.grid) {
      this.grid.destroy(false);
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.grid.enableMove(true);
      this.grid.enableResize(true);
    } else {
      this.grid.enableMove(false);
      this.grid.enableResize(false);
    }
  }

  addWidget(type: WidgetType): void {
    const instanceId = `gs-widget-${this.idCounter++}`;
    const widget: WidgetInstance = {
      instanceId,
      typeId: type.typeId,
      title: type.displayName,
      x: 0,
      y: 0,
      w: type.defaultW,
      h: type.defaultH,
      minW: type.minW,
      minH: type.minH,
      config: {},
    };
    this.widgets = [...this.widgets, widget];
    this.cdr.detectChanges();
    setTimeout(() => {
      const el = this.gridEl.nativeElement.querySelector(`[gs-id="${instanceId}"]`) as HTMLElement;
      if (el) {
        this.grid.makeWidget(el);
      }
    }, 0);
  }

  removeWidget(instanceId: string): void {
    const el = this.gridEl.nativeElement.querySelector(`[gs-id="${instanceId}"]`) as HTMLElement;
    if (el && this.grid) {
      this.grid.removeWidget(el, false);
    }
    this.widgets = this.widgets.filter(w => w.instanceId !== instanceId);
    this.saveLayout();
  }

  saveLayout(): void {
    const layout = this.widgets.map(w => ({
      ...w,
      ...this.getGridPos(w.instanceId),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  }

  private getGridPos(instanceId: string): { x: number; y: number; w: number; h: number } {
    const el = this.gridEl?.nativeElement?.querySelector(`[gs-id="${instanceId}"]`) as HTMLElement | null;
    if (!el) return { x: 0, y: 0, w: 1, h: 1 };
    return {
      x: parseInt(el.getAttribute('gs-x') || '0', 10),
      y: parseInt(el.getAttribute('gs-y') || '0', 10),
      w: parseInt(el.getAttribute('gs-w') || '1', 10),
      h: parseInt(el.getAttribute('gs-h') || '1', 10),
    };
  }

  private updatePositions(items: GridStackNode[]): void {
    items.forEach(item => {
      const id = item.id as string;
      const idx = this.widgets.findIndex(w => w.instanceId === id);
      if (idx >= 0) {
        this.widgets[idx] = {
          ...this.widgets[idx],
          x: item.x ?? this.widgets[idx].x,
          y: item.y ?? this.widgets[idx].y,
          w: item.w ?? this.widgets[idx].w,
          h: item.h ?? this.widgets[idx].h,
        };
      }
    });
    this.saveLayout();
  }

  private loadLayout(): WidgetInstance[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WidgetInstance[];
        this.idCounter = parsed.reduce((max, w) => {
          const num = parseInt(w.instanceId.replace('gs-widget-', ''), 10);
          return isNaN(num) ? max : Math.max(max, num + 1);
        }, 1);
        return parsed;
      }
    } catch {
      // ignore parse errors
    }
    return this.defaultWidgets();
  }

  private defaultWidgets(): WidgetInstance[] {
    this.idCounter = 5;
    return [
      { instanceId: 'gs-widget-1', typeId: 'stats', title: 'Stats', x: 0, y: 0, w: 4, h: 3, config: {} },
      { instanceId: 'gs-widget-2', typeId: 'chart', title: 'Chart', x: 4, y: 0, w: 4, h: 4, config: {} },
      { instanceId: 'gs-widget-3', typeId: 'table', title: 'Table', x: 8, y: 0, w: 4, h: 4, config: {} },
      { instanceId: 'gs-widget-4', typeId: 'text', title: 'Notes', x: 0, y: 3, w: 4, h: 3, config: {} },
    ];
  }

  trackByInstanceId(_index: number, widget: WidgetInstance): string {
    return widget.instanceId;
  }
}
