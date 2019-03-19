import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: Object[] = [];
  ngOnInit(): void {

    

  }
}