import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InitialComponent } from './initial/initial.component';
import { SensorsComponent } from './sensors/sensors.component';
import { SilosComponent } from './silos/silos.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: InitialComponent },
      { path: 'silos', component: SilosComponent },
      { path: 'sensors', component: SensorsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
