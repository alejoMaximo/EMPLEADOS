import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleado: any[] = [];
 

  constructor(private _empleadoService: EmpleadoService,
            private toastr: ToastrService) {   
   }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      console.log(data);
      this.empleado = []
      data.forEach((Element:any) =>{
       this.empleado.push({
        id: Element.payload.doc.id,
        ...Element.payload.doc.data(),
       })
      });
      console.log(this.empleado);
    })
  }

  eliminarEmpleado(id: string) {
    this._empleadoService.eliminarEmpleado(id).then(() =>{
      console.log('empleado eliminado co exito');
      this.toastr.error('El empleado fue eliminado con exito', 'registro eliminado!', {
        positionClass: 'toast-bottom-right'
      })
    }).catch(error => {
      console.log(error);
    })
  }

}
