import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  constructor(private http: HttpClient) { }

  totalProduits(): Observable<any> {
    return this.http.get(`${apiUrl}/api/orders/totalProductsSold`).pipe(map(data=>{
      console.log(data);
      return data;
    }));
  }

  listProduits(): Observable<any> {
    return this.http.get(`${apiUrl}/api/orders/products`).pipe(map(data=>{
      console.log(data);
      return data;
    }));
  }

}
