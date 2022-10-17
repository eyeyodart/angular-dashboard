import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ValueUnitPipe } from 'src/app/pipes/value-unit.pipe';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InitialComponent } from './initial/initial.component';
import { SilosComponent } from './silos/silos.component';
import { SiloDialogFormComponent } from './silo-dialog-form/silo-dialog-form.component';
import { SensorsComponent } from './sensors/sensors.component';
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    InitialComponent,
    SilosComponent,
    SiloDialogFormComponent,
    SensorsComponent,
    ValueUnitPipe,
    CardListComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule],
})
export class DashboardModule {}
