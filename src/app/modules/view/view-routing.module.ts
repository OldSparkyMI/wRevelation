import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WRevelationComponent } from './w-revelation/w-revelation.component';

const routes: Routes = [{
  path: '',
  component: WRevelationComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
