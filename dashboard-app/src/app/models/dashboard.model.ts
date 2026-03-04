export interface GridSettings {
  columns: number;
  rowHeightPx: number;
  marginPx: number;
}

export interface WidgetInstance {
  instanceId: string;
  typeId: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  config: Record<string, unknown>;
}

export interface DashboardDefinition {
  id: string;
  name: string;
  version: number;
  updatedAt: string;
  gridSettings: GridSettings;
  widgets: WidgetInstance[];
}
