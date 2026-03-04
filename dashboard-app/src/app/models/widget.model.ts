import { Type } from '@angular/core';

export interface WidgetType {
  typeId: string;
  displayName: string;
  category: string;
  description: string;
  defaultW: number;
  defaultH: number;
  minW: number;
  minH: number;
  icon: string;
  component: Type<unknown>;
}
