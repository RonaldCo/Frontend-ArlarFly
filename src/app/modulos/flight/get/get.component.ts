import { Component, OnInit } from '@angular/core';
import { FlightModelo } from 'src/app/modelos/flight.model';
import { FlightService } from 'src/app/servicios/flight.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {


  constructor(private FlightService:FlightService ) { }
  listado: FlightModelo[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.FlightService.getAll().subscribe((data: FlightModelo[]) => {
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
        this.FlightService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }
}
