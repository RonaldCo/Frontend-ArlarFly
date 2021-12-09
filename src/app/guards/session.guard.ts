import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../servicios/security.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private securityService: SecurityService,
    private router: Router,
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    if(this.securityService.isLoggedIn()){
      
      return true;
    }else{
      Swal.fire('No estás logueado,para Acceder a la Informacion')
      this.router.navigate(['/security/login']);
      return false;
    }

  }
  
}
