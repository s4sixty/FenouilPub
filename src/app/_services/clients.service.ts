import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
}
