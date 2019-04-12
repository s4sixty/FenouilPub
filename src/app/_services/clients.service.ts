import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders,   } from '@angular/common/http';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ClientsService {



  constructor(private http:HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get(`${apiUrl}/api/customers/list`).pipe(map(data=>{
      console.log(data);
      return data;
    }));
  }

  getClientsXml(): Observable<string> {
    const headers = new HttpHeaders({ 'Accept': 'application/xml' });
    headers.append('Accept', 'application/xml');
    return this.http.get(`${apiUrl}/api/customers/list`, {headers: headers, responseType:'text' }).pipe(map(data=>{
      console.log(data);
      return data;
    }));
  }

  getClientsByParameter(categorie: string,age_min: number, age_max: number, departement: string, client: boolean): Observable<any> {
    const deja_client = client?"true":"false";
    return this.http.post(`${apiUrl}/api/customers/listParams`, {categorie, age_min, age_max, departement, deja_client}).pipe(map(data=>{
      console.log(data);
      return data;
    }));
  }

  getClientsByParameterXml(categorie: string,age_min: number, age_max: number, departement: string, client: boolean): Observable<string> {
    const headers = new HttpHeaders({ 'Accept': 'application/xml' });
    headers.append('Accept', 'application/xml');
    const deja_client = client?"true":"false";
    return this.http.post(`${apiUrl}/api/customers/listParams`, {categorie, age_min, age_max, departement, deja_client }, {headers: headers, responseType:'text' }).pipe(map(data=>{
      console.log(data);
      return data;
    }));
  }

}
