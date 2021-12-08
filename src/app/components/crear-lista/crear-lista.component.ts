import { Tarea} from './../../Model/modelo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from 'src/app/services/tarea.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crearlista',
  templateUrl: './crear-lista.component.html',
  styleUrls: ['./crear-lista.component.css']
})
export class CrearListaComponent implements OnInit {

  formBuilder: FormGroup;
  loading: boolean = false;
  titulo = 'Agregar Tarjeta';
  id: string | undefined;

  constructor(private fb: FormBuilder,private servicioTarea: TareaService, private toastr: ToastrService) {

    this.formBuilder = this.fb.group({
      titulo: ['',[Validators.required,Validators.maxLength(30)]],
      prioridad: ['',[Validators.required,Validators.maxLength(10)]],
      fechaInicio: ['',[Validators.required,Validators.maxLength(5)]],
      fechaFin: ['',[Validators.required,Validators.maxLength(5)]],
      descripcion: ['',[Validators.required,Validators.maxLength(50)]],
    })
   }

  ngOnInit(): void {
    this.servicioTarea.getTareaEdit().subscribe(data => {
      this.id = data.id
      this.titulo = "editar tarjeta";
      this.formBuilder.patchValue({
        titulo: data.titulo,
        prioridad: data.prioridad,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        descripcion: data.descripcion,
      })
    });
  }
  
  guardarTareaEdit(){
    if(this.id=== undefined){
      this.crearTarea();
    }else{
      this.editarTarea(this.id);
    }
  }
  crearTarea(){
    const tarea: Tarea = {
      titulo: this.formBuilder.value.titulo,
      prioridad: this.formBuilder.value.prioridad,
      descripcion: this.formBuilder.value.descripcion,
      fechaInicio : this.formBuilder.value.fechaInicio,
      fechaFin: this.formBuilder.value.fechaFin,
    }

    this.loading= true;
    this.servicioTarea.guardarTarea(tarea).then(() => {
      this.loading= false;
       this.toastr.success('Done','Su tarjeta fue registrada');
       this.formBuilder.reset();
    }, err => {
      this.loading= false;
      this.toastr.error('Error','Vuelve a intentarlo')})
  }

  editarTarea(id: string){
    const tarea: any = {
      titulo: this.formBuilder.value.titulo,
      prioridad: this.formBuilder.value.prioridad,
      descripcion: this.formBuilder.value.descripcion,
      fechaInicio : this.formBuilder.value.fechaInicio,
      fechaFin: this.formBuilder.value.fechaFin,
    }
    this.loading = true;
    this.servicioTarea.editandoTarea(id,tarea).then(() => {
      this.loading = false;
      this.titulo = "Editar Tarea";
      this.formBuilder.reset();
      this.id = undefined;
      this.toastr.info('Done','Tarea Actualizada')
    },error=>{
      console.log(error);
    })
    
  }

}
