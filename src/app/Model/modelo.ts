export class tarea {
    id?: string;
    titulo: string;
    fechaInicio: Date;
    fechaFin: Date;
    prioridad: string;
    descripcion: string;

    constructor(titulo: string,prioridad:string,descripcion:string){
        this.titulo = titulo;
        this.prioridad = prioridad;
        this.descripcion = descripcion;
    }
}