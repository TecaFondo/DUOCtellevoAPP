
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAnimation } from "@ionic/core";
import { ElementRef } from '@angular/core';

import { PostServiceService } from '../post-service/services.service';
import { AlertController } from '@ionic/angular';

import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

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
constructor(private route: ActivatedRoute, public postServices:PostServiceService,private alertController: AlertController) {
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



}
  

}
