import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteModelo } from '../modelos/route.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient,
    private securityService: SecurityService) { 
    this.token = this.securityService.getToken();
  }

  url = "http://localhost:3000"
  token: string = ''

  store(route: RouteModelo): Observable<RouteModelo> {
   return this.http.post<RouteModelo>(`${this.url}/route`, {
     Origen: route.Origen,
     tiempoEst: route.tiempoEst,
     origen: route.origen,
     Destino: route.Destino,
    
   });
 }

 getAll(): Observable<RouteModelo[]>{
   return this.http.get<RouteModelo[]>(`${this.url}/route`, {
     headers: new HttpHeaders({
       "Authorization": `Bearer ${this.token}`
     })
   })
 }
 
 update(route: RouteModelo): Observable<RouteModelo> {
   return this.http.patch<RouteModelo>(`${this.url}/route/${route.id}`, {
    Origen: route.Origen,
    tiempoEst: route.tiempoEst,
    origen: route.origen,
    Destino: route.Destino,
   }, {
     headers: new HttpHeaders({
       "Authorization": `Bearer ${this.token}`
     })
   });
 }

 delete(id: string): Observable<RouteModelo[]>{
   return this.http.delete<RouteModelo[]>(`${this.url}/route/${id}`, {
     headers: new HttpHeaders({
       "Authorization": `Bearer ${this.token}`
     })
   })
 }

 getWithId(id: string): Observable<RouteModelo>{
   return this.http.get<RouteModelo>(`${this.url}/route/${id}`,{
     headers: new HttpHeaders({
       "Authorization": `Bearer ${this.token}`
     })
   })
 }
}
