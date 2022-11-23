import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAnimation } from "@ionic/core";
import { ElementRef } from '@angular/core';

import { PostServiceService } from '../post-service/services.service';
import { AlertController } from '@ionic/angular';

import { GoogleMap } from '@capacitor/google-maps';



@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage {
  [x: string]: any;

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  //newMap: GoogleMap;

  async createMap(){
    const newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: "AIzaSyBK04u7awKfO9Bmd1nlRp3YZf4yA8p-kXg",
      config: {
        center: {
          lat: -33.033532,
          lng:  -71.533163,
        },
        zoom: 15,
      }, 
    });
    newMap.addMarker({
      coordinate: {
        lat: -33.033532,
          lng:  -71.533163,
      }
    });
  }
    
  
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
  this.createMap();
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


}
