import { Component, OnInit } from '@angular/core';
import * as cryptoJS from 'crypto-js';
import { SecurityService } from 'src/app/servicios/security.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private SecurityService: SecurityService,
    private router: Router
    ) { }

    fgValidacion = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]]
    });

  ngOnInit(): void {
  }
  identificarUsuario(){
    let usuario = this.fgValidacion.controls["correo"].value;
    let clave = this.fgValidacion.controls["clave"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
 
    this.SecurityService.login(usuario, claveCifrada).subscribe(
      (data: any) => {
        this.SecurityService.almacenarSesion(data)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        }).then(() =>{
          this.router.navigate(['/index']);
        })

      },
      (error: any) => {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: 'Datos Invalidos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })

      }
    );
  }

}
