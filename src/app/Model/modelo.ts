export class Tarea {
    id?: string;
    titulo: string;
    fechaInicio: Date;
    fechaFin: Date;
    prioridad: string;
    descripcion: string;

    constructor(titulo: string,prioridad:string,descripcion:string,fechaInicio:Date,fechaFin:Date){
        this.titulo = titulo;
        this.prioridad = prioridad;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}