import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../_services/clients.service';


@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  clients: any = [];

  ngOnInit(): void {
    this.getClients();
  }

  constructor(private clientsservice : ClientsService) {}

  getClients() : void {
    this.clientsservice.getClients()
      .subscribe(
        result => this.clients= result,
        error => console.log("Erreur :: " + error)
      )
  }
}