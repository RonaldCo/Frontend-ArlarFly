import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) {
    this.verificarSesion();
   }

   url = "http://localhost:3000";
  sessionUserData = new BehaviorSubject<UsuarioModelo>(new UsuarioModelo());

  login(correo: string, clave: string): Observable<any> {
    //Hacemos la solicitud al servicio web de login pasandole usuario y clave
    return this.http.post<any>(`${this.url}/login`, {
      usuario: correo,
      password: clave
    }, {
      headers: new HttpHeaders({
 
      })
    });
  }
  almacenarSesion(data: any): Boolean {
    // Verificamos si existe la sesion
    let sessionData = localStorage.getItem("sessionData");
    if (sessionData) {
      return false;
    } else {
      // Definimos los datos a almacenar
      let payload = {
        id: data?.data.id,
        username: data?.data.nombre + " " + data?.data.apellidos ,
        token: data.token,
        isLoggedIn: true
      };
      // Lo convertimos a string
      let datosString = JSON.stringify(payload);
      // Almacenamos los datos en el localStorage
      localStorage.setItem("sessionData", datosString);
      // Definimos una bandera de session
      data.isLoggedIn = true;
      // Refrescamos los datos de la session
      this.refrescarDatosSession(data);
      return true;
    }
  }
  refrescarDatosSession(data: any){
    this.sessionUserData.next(data)
  }
  eliminarSesion(){
    //Eliminamos los datos de la sesion
    localStorage.removeItem("sessionData")
    this.refrescarDatosSession(new UsuarioModelo)
  }

verificarSesion(){
    let data = this.isLoggedIn();
    if(data){
      this.refrescarDatosSession(data)
    }
  }
  isLoggedIn(){
    //Verifica si hay informacion en el localStorage
    let sessionData = localStorage.getItem("sessionData");
    if(sessionData){
      //Si hay info la retorno
      let data = JSON.parse(sessionData);
      return data;
    }
    return null
  }
  datosUsuarioSesion(){
    return this.sessionUserData.asObservable();
  }
  getToken(){
    //Obtiene el token de la persona logeada
    let sessionData = localStorage.getItem("sessionData");
    if(sessionData){
      let data = JSON.parse(sessionData);
      return data.token;
    }
    return ''
  }   
}
