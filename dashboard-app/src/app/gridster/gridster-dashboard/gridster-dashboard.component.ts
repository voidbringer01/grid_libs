import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItemConfig, DisplayGrid, GridType, CompactType } from 'angular-gridster2';
import { WidgetInstance } from '../../models/dashboard.model';
import { WidgetRegistryService } from '../../registry/widget-registry.service';
import { WidgetType } from '../../models/widget.model';

const STORAGE_KEY = 'gr-dashboard-layout';

export interface GridsterWidget extends WidgetInstance {
  gridsterItem: GridsterItemConfig;
}

@Component({
  selector: 'app-gridster-dashboard',
  standalone: false,
  templateUrl: './gridster-dashboard.component.html',
  styleUrls: ['./gridster-dashboard.component.scss']
})
export class GridsterDashboardComponent implements OnInit {
  editMode = false;
  widgets: GridsterWidget[] = [];
  widgetTypes: WidgetType[] = [];
  options!: GridsterConfig;
  private idCounter = 1;

  constructor(
    private registry: WidgetRegistryService,
  ) {}

  ngOnInit(): void {
    this.widgetTypes = this.registry.getAll();
    this.initOptions();
    this.widgets = this.loadLayout();
  }

  private initOptions(): void {
    this.options = {
      gridType: GridType.ScrollVertical,
      displayGrid: DisplayGrid.OnDragAndResize,
      compactType: CompactType.None,
      pushItems: true,
      draggable: {
        enabled: false,
        ignoreContentClass: 'widget-content',
        ignoreContent: false,
        dragHandleClass: 'drag-handle',
      },
      resizable: { enabled: false },
      minCols: 12,
      maxCols: 12,
      minRows: 6,
      itemChangeCallback: () => this.saveLayout(),
    };
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.options = {
      ...this.options,
      draggable: { ...this.options.draggable, enabled: this.editMode },
      resizable: { enabled: this.editMode },
    };
    if (this.options['api']?.resize) {
      this.options['api'].resize();
    }
  }

  addWidget(type: WidgetType): void {
    const instanceId = `gr-widget-${this.idCounter++}`;
    const gridsterItem: GridsterItemConfig = {
      cols: type.defaultW,
      rows: type.defaultH,
      x: 0,
      y: 0,
    };
    const widget: GridsterWidget = {
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
      gridsterItem,
    };
    this.widgets = [...this.widgets, widget];
    this.saveLayout();
  }

  removeWidget(instanceId: string): void {
    this.widgets = this.widgets.filter(w => w.instanceId !== instanceId);
    this.saveLayout();
  }

  saveLayout(): void {
    const layout = this.widgets.map(w => ({
      instanceId: w.instanceId,
      typeId: w.typeId,
      title: w.title,
      x: w.gridsterItem.x,
      y: w.gridsterItem.y,
      w: w.gridsterItem.cols,
      h: w.gridsterItem.rows,
      minW: w.minW,
      minH: w.minH,
      config: w.config,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  }

  private loadLayout(): GridsterWidget[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as WidgetInstance[];
        this.idCounter = parsed.reduce((max, w) => {
          const num = parseInt(w.instanceId.replace('gr-widget-', ''), 10);
          return isNaN(num) ? max : Math.max(max, num + 1);
        }, 1);
        return parsed.map(w => ({
          ...w,
          gridsterItem: { cols: w.w, rows: w.h, x: w.x, y: w.y } as GridsterItemConfig,
        }));
      }
    } catch {
      // ignore
    }
    return this.defaultWidgets();
  }

  private defaultWidgets(): GridsterWidget[] {
    const defs: WidgetInstance[] = [
      { instanceId: 'gr-widget-1', typeId: 'stats', title: 'Stats', x: 0, y: 0, w: 4, h: 3, config: {} },
      { instanceId: 'gr-widget-2', typeId: 'chart', title: 'Chart', x: 4, y: 0, w: 4, h: 4, config: {} },
      { instanceId: 'gr-widget-3', typeId: 'table', title: 'Table', x: 8, y: 0, w: 4, h: 4, config: {} },
      { instanceId: 'gr-widget-4', typeId: 'text', title: 'Notes', x: 0, y: 3, w: 4, h: 3, config: {} },
    ];
    this.idCounter = 5;
    return defs.map(w => ({
      ...w,
      gridsterItem: { cols: w.w, rows: w.h, x: w.x, y: w.y } as GridsterItemConfig,
    }));
  }

  trackByInstanceId(_index: number, widget: GridsterWidget): string {
    return widget.instanceId;
  }
}
