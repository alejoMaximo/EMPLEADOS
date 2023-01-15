import { Type } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
            private _empleadoservice: EmpleadoService,
            private router: Router,) { 
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarEmpleado() {
    this.submitted = true;

    if(this.createEmpleado.invalid){
      return;
    }
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      document: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechacreacion: new Date(),
      fechaActualizacion: new Date()
    }
    
    this._empleadoservice.agregarEmpleado(empleado).then(() =>{
     // this.toastr.success('El empleado fue registrado con exito', 'Empleado registrado');
      this.router.navigate(['/list-empleadoas'])
    }).catch(error => {
      console.log(error);
    })
  }
  
}
