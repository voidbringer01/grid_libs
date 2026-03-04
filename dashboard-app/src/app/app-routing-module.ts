import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'gridstack', loadChildren: () => import('./gridstack/gridstack.module').then(m => m.GridstackModule) },
  { path: 'gridster', loadChildren: () => import('./gridster/gridster.module').then(m => m.GridsterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
