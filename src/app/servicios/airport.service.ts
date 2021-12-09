import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirportModelo } from '../modelos/Airport.model';
import { SecurityService } from './security.service';


@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient,
    private securityService: SecurityService) {
    this.token = this.securityService.getToken();
   }

  url = "http://localhost:3000"
     token: string = ''

     store(Airport: AirportModelo): Observable<AirportModelo> {
      return this.http.post<AirportModelo>(`${this.url}/airport`, {
        nombre: Airport.nombre,
        Ciudad: Airport.Ciudad,
        Coordx: Airport.Coordx,
        Coordy: Airport.Coordy,
        Siglas: Airport.Siglas,
        Tipo:   Airport.Tipo
      });
    }

    getAll(): Observable<AirportModelo[]>{
      return this.http.get<AirportModelo[]>(`${this.url}/airport`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    
    update(Airport: AirportModelo): Observable<AirportModelo> {
      return this.http.patch<AirportModelo>(`${this.url}/airport/${Airport.id}`, {
        nombre: Airport.nombre,
        Ciudad: Airport.Ciudad,
        Coordx: Airport.Coordx,
        Coordy: Airport.Coordy,
        Siglas: Airport.Siglas,
        Tipo:   Airport.Tipo
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
   
    delete(id: string): Observable<AirportModelo[]>{
      return this.http.delete<AirportModelo[]>(`${this.url}/airport/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
   
    getWithId(id: string): Observable<AirportModelo>{
      return this.http.get<AirportModelo>(`${this.url}/airport/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}
