import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Tarea } from '../Model/modelo';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private $tarea = new Subject<Tarea>();

  constructor(private firestore: AngularFirestore) {}
  
  guardarTarea(tarea: Tarea):Promise<any> {
    return this.firestore.collection('tareas').add(tarea);
  }
  obtenerTarea(): Observable<any> {
    return this.firestore.collection('tareas',ref => ref.orderBy('fechaInicio','desc')).snapshotChanges();
  }
  eliminarTarea(id: string): Promise<any> {
    return this.firestore.collection('tareas').doc(id).delete();
  }
  editTarea(tarea:Tarea){
    this.$tarea.next(tarea);
  }
  getTareaEdit():Observable<Tarea>{
    return this.$tarea.asObservable();  
  }
  
  editandoTarea(id:string,tarea:any):Promise<any>{
    return this.firestore.collection('tareas').doc(id).update(tarea);
  }  

}

