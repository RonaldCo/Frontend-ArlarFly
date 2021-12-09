import { Component, OnInit } from '@angular/core';
import { UsuarioModelo } from 'src/app/modelos/user.model';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private UserService: UserService) { }

  listado: UsuarioModelo[] = []


  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.UserService.getAll().subscribe((data: UsuarioModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }
 
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.UserService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }
}
