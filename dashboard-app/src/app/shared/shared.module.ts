import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { WidgetFrameComponent } from './widget-frame/widget-frame.component';
import { StatsWidgetComponent } from './widgets/stats-widget.component';
import { ChartWidgetComponent } from './widgets/chart-widget.component';
import { TableWidgetComponent } from './widgets/table-widget.component';
import { TextWidgetComponent } from './widgets/text-widget.component';

@NgModule({
  declarations: [
    WidgetFrameComponent,
    StatsWidgetComponent,
    ChartWidgetComponent,
    TableWidgetComponent,
    TextWidgetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    WidgetFrameComponent,
    StatsWidgetComponent,
    ChartWidgetComponent,
    TableWidgetComponent,
    TextWidgetComponent,
  ]
})
export class SharedModule { }
