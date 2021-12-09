import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightModelo } from '../modelos/flight.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient,
    private securityService: SecurityService) { 
    this.token = this.securityService.getToken();
  }

  url = "http://localhost:3000"
     token: string = ''

     store(flight: FlightModelo): Observable<FlightModelo> {
      return this.http.post<FlightModelo>(`${this.url}/flight`, {
        fecha_ini: flight.fecha_ini,
        hora_inicio: flight.hora_inicio,
        fecha_final: flight.fecha_final,
        hora_final: flight.hora_final,
        asientos_vendidos: flight.asientos_vendidos,
        nombre_piloto:   flight.nombre_piloto,
        ruta:   flight.ruta
      });
    }

    getAll(): Observable<FlightModelo[]>{
      return this.http.get<FlightModelo[]>(`${this.url}/flight`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
    
    update(flight: FlightModelo): Observable<FlightModelo> {
      return this.http.patch<FlightModelo>(`${this.url}/flight/${flight.id}`, {
        fecha_ini: flight.fecha_ini,
        hora_inicio: flight.hora_inicio,
        fecha_final: flight.fecha_final,
        hora_final: flight.hora_final,
        asientos_vendidos: flight.asientos_vendidos,
        nombre_piloto:   flight.nombre_piloto,
        ruta:   flight.ruta
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }
   
    delete(id: string): Observable<FlightModelo[]>{
      return this.http.delete<FlightModelo[]>(`${this.url}/flight/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
   
    getWithId(id: string): Observable<FlightModelo>{
      return this.http.get<FlightModelo>(`${this.url}/flight/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }
}
