import { Component, OnInit } from '@angular/core';
import { ClientsService  } from '../../_services/clients.service';
import { CommandesService } from '../../_services/commandes.service';
import { FormGroup, FormControl, FormBuilder,  Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  clients: any = [];
  myform: FormGroup;
  submitted = false;
  formError = false;
  totalProduits: Number = 0;
  isLoading: boolean = false;
  departements : any = [];
  produits: any = [];
  categories_sociopro: any = ['Etudiant', 'Employé', 'Ouvrier', 'Professions intérmediaires', 'Cadre', 'Chefs d\'entreprises ou artisans commerciaux', 'Agriculteurs exploitants'];
  fileUrl;
  request_params: boolean = false;

  ngOnInit(): void {
    this.createForm();
    this.getClients();
    this.totalProduitsV();
    this.listProduits();
    
  }

  constructor(
    private clientsservice : ClientsService,
    private commandesservice : CommandesService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
  ) {}

  getClients() : void {
    this.clientsservice.getClients()
      .subscribe(
        result => this.clients= result,
        error => console.log("Erreur :: " + error)
      )
  }

  getClientsXml() : void {
    this.clientsservice.getClientsXml()
      .subscribe(
        result => {
          console.log(result);
          const data = result;
          const blob = new Blob([data], { type: 'application/octet-stream' });
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          saveAs(blob, 'liste_clients.xml');
        },
        error => console.log("Erreur :: " + error)
      )
  }

  get formData() { return this.myform.controls; }

  getClientsByParameters() : void {
    this.clientsservice.getClientsByParameter(this.formData.categorie.value, this.formData.age_min.value, this.formData.age_max.value, this.formData.departement.value, this.formData.deja_client.value )
      .subscribe(
        result => this.clients= result,
        error => console.log("Erreur :: " + error)
      )
      this.request_params = true;
  }

  getClientsByParametersXml() : void {
    this.clientsservice.getClientsByParameterXml(this.formData.categorie.value, this.formData.age_min.value, this.formData.age_max.value, this.formData.departement.value, this.formData.deja_client.value )
      .subscribe(
        result => {
          console.log(result);
          const data = result;
          const blob = new Blob([data], { type: 'application/octet-stream' });
          this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
          saveAs(blob, 'liste_clients.xml');
        },
        error => console.log("Erreur :: " + error)
      )
      this.request_params = true;
  }

  totalProduitsV() : void {
    this.commandesservice.totalProduits()
      .subscribe(
        result => this.totalProduits = result,
        error => console.log("Erreur :: " + error)
      )
  }

  listProduits() : void {
    this.commandesservice.listProduits()
      .subscribe(
        result => this.produits = result,
        error => console.log("Erreur :: " + error)
      )
  }

  onSubmit() {
    this.submitted = true;
    if (this.myform.invalid) {
      this.formError = true;
    } else {
      this.formError = false;
      this.getClientsByParameters();
    }
  }

  createForm() {
    this.myform = this.fb.group({
      categorie: ['', Validators.required ],
      age_min: ['', Validators.compose([Validators.required, Validators.min(18), Validators.max(150), Validators.pattern("^[0-9]*$"),])],
      age_max: ['', Validators.compose([Validators.required, Validators.max(150), Validators.min(18), Validators.pattern("^[0-9]*$"),]) ],
      departement: ['', Validators.required ],
      deja_client: [''],
    });
  }

  genererXml() {
    console.log("test_out");
    
    if(!this.request_params) {
      this.getClientsXml();
      console.log("test_in1");
    } else {
      this.getClientsByParametersXml();
      console.log("test_in2");
    }
  }


}