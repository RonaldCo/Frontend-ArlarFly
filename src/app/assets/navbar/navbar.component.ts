import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioModelo } from 'src/app/modelos/user.model';
'src/app/modelos/usuario.model';
import { SecurityService } from 'src/app/servicios/security.service';
'src/app/servicios/seguridad.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  activeSession?:boolean = false;
  subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.subs = this.securityService.datosUsuarioSesion().subscribe((data: UsuarioModelo) => {
      console.log(data)
        this.activeSession = data.isLoggedIn;
    })

  }

}
