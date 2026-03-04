import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Gridster, GridsterItem } from 'angular-gridster2';

import { SharedModule } from '../shared/shared.module';
import { GridsterDashboardComponent } from './gridster-dashboard/gridster-dashboard.component';

const routes: Routes = [
  { path: '', component: GridsterDashboardComponent }
];

@NgModule({
  declarations: [GridsterDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    Gridster,
    GridsterItem,
    SharedModule,
  ]
})
export class GridsterModule { }
