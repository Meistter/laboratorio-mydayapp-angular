import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Tarea } from 'src/app/models/task';
import { ComunicationService } from 'src/app/services/comunication.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

@Input() tarea : Tarea = {id: 0,title : '', completed : false}
dataLocal : Tarea[] = []
terminada = false
editar = false

tareaEdited = new FormControl(`${this.tarea.title}`)
constructor(private comunication: ComunicationService){}

ngOnInit(): void{
  if(this.tarea.completed == true) {
    this.terminada = true
  }

}
toggleTask(){
  const existe = localStorage.getItem('mydayapp-angular')
  if (existe){
    this.dataLocal = JSON.parse(existe)

    var indice = this.dataLocal.map(producto => producto.id).indexOf(this.tarea.id)
    if(this.dataLocal[indice].completed == false){
      this.dataLocal[indice].completed = true
      this.terminada = true
    }else{
      this.dataLocal[indice].completed = false
      this.terminada = false
    }

    localStorage.setItem('mydayapp-angular', JSON.stringify(this.dataLocal))
    this.comunication.reCount.emit()
  }
}
eliminar(){
  const existe = localStorage.getItem('mydayapp-angular')
  if (existe){
    this.dataLocal = JSON.parse(existe)

  var indice = this.dataLocal.map(producto => producto.id).indexOf(this.tarea.id)

  this.dataLocal.splice(indice,1)
  localStorage.setItem('mydayapp-angular', JSON.stringify(this.dataLocal))
  this.comunication.addTask.emit()
  }
}

click(){
 this.editar =true

}

editContent(e:any){
  e.preventDefault()

  // if(this.editElement)
  const existe = localStorage.getItem('mydayapp-angular')
  if (existe){
    this.dataLocal = JSON.parse(existe)

    var indice = this.dataLocal.map(producto => producto.id).indexOf(this.tarea.id)
    if(this.tareaEditedField){
      this.dataLocal[indice].title = this.tareaEditedField
    }


    localStorage.setItem('mydayapp-angular', JSON.stringify(this.dataLocal))
    this.comunication.addTask.emit()
    this.comunication.reCount.emit()
  }


}
get tareaEditedField(){
  return this.tareaEdited.value
}
}
