import { Injectable } from '@angular/core';
import { WidgetType } from '../models/widget.model';
import { StatsWidgetComponent } from '../shared/widgets/stats-widget.component';
import { ChartWidgetComponent } from '../shared/widgets/chart-widget.component';
import { TableWidgetComponent } from '../shared/widgets/table-widget.component';
import { TextWidgetComponent } from '../shared/widgets/text-widget.component';

@Injectable({ providedIn: 'root' })
export class WidgetRegistryService {
  private readonly types: WidgetType[] = [
    {
      typeId: 'stats',
      displayName: 'Stats',
      category: 'Analytics',
      description: 'Display key metrics and KPIs',
      defaultW: 4,
      defaultH: 3,
      minW: 2,
      minH: 2,
      icon: 'bar_chart',
      component: StatsWidgetComponent,
    },
    {
      typeId: 'chart',
      displayName: 'Chart',
      category: 'Analytics',
      description: 'Visualize data with bar charts',
      defaultW: 4,
      defaultH: 4,
      minW: 2,
      minH: 3,
      icon: 'show_chart',
      component: ChartWidgetComponent,
    },
    {
      typeId: 'table',
      displayName: 'Table',
      category: 'Data',
      description: 'Display tabular data',
      defaultW: 6,
      defaultH: 4,
      minW: 3,
      minH: 3,
      icon: 'table_chart',
      component: TableWidgetComponent,
    },
    {
      typeId: 'text',
      displayName: 'Text',
      category: 'Content',
      description: 'Editable text content block',
      defaultW: 4,
      defaultH: 3,
      minW: 2,
      minH: 2,
      icon: 'text_fields',
      component: TextWidgetComponent,
    },
  ];

  getAll(): WidgetType[] {
    return this.types;
  }

  getById(typeId: string): WidgetType | undefined {
    return this.types.find(t => t.typeId === typeId);
  }
}
