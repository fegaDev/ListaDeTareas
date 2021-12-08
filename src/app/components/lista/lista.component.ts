import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tarea } from 'src/app/Model/modelo';
import { TareaService } from 'src/app/services/tarea.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  listaTarea: Tarea[]=[];


  constructor(private tareaService: TareaService,private toastr: ToastrService) { }

  ngOnInit(): void {
  this.obtenerTarea();
  }

  obtenerTarea(){
    this.tareaService.obtenerTarea().subscribe(data => {
      this.listaTarea = [];
      data.forEach((element: any) => {
        this.listaTarea.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }
  eliminarTarea(id:any){
    this.tareaService.eliminarTarea(id).then(() => {
      this.toastr.success('Done','Tarea eliminada con exito')
    },err => {
      this.toastr.error('Error','No se puede eliminar tarea')
    })
  }
  editarTarea(tarea:Tarea){
    this.tareaService.editTarea(tarea);
  }

  
}
