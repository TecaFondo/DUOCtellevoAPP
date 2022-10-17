
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAnimation } from "@ionic/core";
import { ElementRef } from '@angular/core';

import { PostServiceService } from '../post-service/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  post:any={
    id:null,
    name:null,
    username:"",
    email:"",
  };
  @ViewChild("Logo") Logo:ElementRef; //se genera un hijo en el cual correr animación de elemento
  usuario: any; 
constructor(private route: ActivatedRoute, public postServices:PostServiceService) {
  this.usuario = this.route.snapshot.paramMap.get('nombre')
}
ngAfterViewInit(){ //Al visualizar elemento se da comienzo a animación
  
  const animation = createAnimation()
  .addElement(this.Logo.nativeElement)
  .easing("ease-in-out")
  .duration(1000)
  .direction("alternate")
  .iterations(Infinity)
  .keyframes([
    { offset: 0, transform: "scale(1)", opacity: "1" },
    { offset: 1, transform: "scale(1.5)", opacity: "0.5" }
  ]);

animation.play();

}

  //PASO 9 
  //Creo arreglo que almacenará la información
  arrayPosts : any;


  //PASO 11 
  //Al entrar a la página llamo al método que CREARÉ para obtener la infor
  ionViewWillEnter(){
    this.getPosts();
  }

  //PASO 12 
  //Creo el método para consumir el servicio
  //Se reemplaza con NUEVO 2.3 si se utiliza Observable

  //funciones simplemente llaman a funciones en post-service y muestran salida por consola con finalidad de debug.
  getPosts(){
    this.postServices.getPosts()
    .then(data =>{
      this.arrayPosts = data;
    });
  }  

  createPost(){
    this.postServices.createPost(this.post).subscribe(
      ()=>{
        console.log("Post creado.");
        this.getPosts();
      },
      error=>{
        console.log("Error " + error)
      }
    );
  }
  updatePost(){
    this.postServices.updatePost("1",this.post).subscribe( //se entrega id apra realizar el update de los datos.
      ()=>{
        console.log("Post actualizado.");
        this.getPosts();
      },
      error=>{
        console.log("Error " + error)
      }
    );
  }

  deletePost(){
    this.postServices.deletePost("1",this.post).subscribe( //se entrega id para realizar el delete.
      ()=>{
        console.log("Post eliminado.");
        this.getPosts();
      },
      error=>{
        console.log("Error " + error)
      }
    );
  }

  

}
