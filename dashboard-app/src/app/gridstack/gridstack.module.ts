import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { GridstackDashboardComponent } from './gridstack-dashboard/gridstack-dashboard.component';

const routes: Routes = [
  { path: '', component: GridstackDashboardComponent }
];

@NgModule({
  declarations: [GridstackDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
  ]
})
export class GridstackModule { }
