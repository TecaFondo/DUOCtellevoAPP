
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAnimation } from "@ionic/core";
import { ElementRef } from '@angular/core';

import { PostServiceService } from '../post-service/services.service';
import { AlertController } from '@ionic/angular';

import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@awesome-cordova-plugins/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: "AIzaSyBK04u7awKfO9Bmd1nlRp3YZf4yA8p-kXg",
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }

  post:any={
    id:null,
    username:null,
    marca:null,
    modelo:null,
    color:null,
    hora:null,
    destino:null,
    puestos:4,
  };
  
  @ViewChild("Logo") Logo:ElementRef; //se genera un hijo en el cual correr animación de elemento
  usuario: any; 
  Patente: any;
  Marca: any;
  Modelo:any;
  Color:any;
  Hora:any;
  Destino:any;
  forma: any;
  handlerMessage = '';
  roleMessage = '';
constructor(private route: ActivatedRoute, public postServices:PostServiceService,private alertController: AlertController,private geolocation: Geolocation) {
  this.usuario = this.route.snapshot.paramMap.get('nombre')
}



ngAfterViewInit(){ //Al visualizar elemento se da comienzo a animación

  const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
  
    console.log('Current position:', coordinates);
  };

  printCurrentPosition();
  
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
  arrayPosts : any; //Se genera arreglo para guardar datos

  ionViewWillEnter(){ //Se llama a método de obtencion de datos al entrar a la vista
    this.getPosts();
  }

  //funciones simplemente llaman a funciones en post-service y muestran salida por consola con finalidad de debug.
  getPosts(){
    this.postServices.getPosts()
    .then(data =>{
      this.arrayPosts = data;
    });
  }  

  getPost(id){
    this.postServices.getPost(id)
    .then(data =>{
      this.post = data;
      console.log(this.post.patente);
    });
  }  


  createPost(){
    this.post.puestos=4;
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

  async noPuestos() {
    const alert = await this.alertController.create({
      header: 'No hay puestos disponibles',
      subHeader: '',
      message: 'Prueba con otro viaje!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  updatePosts(postID){ //Se actualiza post deseado (en este caso estamos eliminando un puesto disponible)
    console.log(postID);  
    this.getPost(postID);
      if(this.post.puestos<1){
        this.noPuestos();
        this.getPosts();
      }
      else{
        this.post.puestos-=1;
        this.postServices.updatePost(postID,this.post).subscribe( //se entrega id apra realizar el update de los datos.
      ()=>{
        console.log("Post actualizado.");
        this.getPosts();
      },
      error=>{
        console.log("Error " + error)
      });
      
      }
    }

  deletePost(postID){
    this.postServices.deletePost(postID,this.post).subscribe( //se entrega id para realizar el delete.
      ()=>{
        console.log("Post eliminado.");
        this.getPosts();
      },
      error=>{
        console.log("Error " + error)
      }
    );
  }
  async eliminar(id) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar viaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Elimianr',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            this.deletePost(id);
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
  onSubmit(JSONForm){
    //se ingresan datos y se guardan en tipo de dato post
    this.post.patente=this.Patente;
    this.post.marca=this.Marca;
    this.post.modelo=this.Modelo;
    this.post.color=this.Color;
    this.post.hora=this.Hora;
    this.post.destino=this.Destino;
    // se procede a guardar elemento post dentro de archivo JSON
    this.createPost();
    //Se vacían los campos de entrada
    this.Patente="";
    this.Marca="";
    this.Modelo="";
    this.Color="";
    this.Hora="";
    this.Destino="";
  }
  

}
