import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from "@angular/common";
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule  } from '@angular/forms';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    CommonModule,
    TabsModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule { }
