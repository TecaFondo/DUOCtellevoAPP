
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createAnimation } from "@ionic/core";
import { ElementRef } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild("Logo") Logo:ElementRef; //se genera un hijo en el cual correr animación de elemento
  usuario: any; 
constructor(private route: ActivatedRoute) {
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

}
