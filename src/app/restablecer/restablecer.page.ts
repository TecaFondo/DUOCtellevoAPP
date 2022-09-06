import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Validators, FormControl, FormBuilder,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  ios: boolean; //esto es para detectar cuando un dispositivo es iOS
  android: boolean; //same with android

  usuario={
    nombre:'',
    password:''
  }
  constructor(public platform: Platform) { //valida tipo dispositivo (android o ios)
    this.ios = platform.is('ios');
    this.android = platform.is('android');
}

onSubmitTemplate(){ //Muestra datos de usuario (si son correctos <cumplen validacion>)
  console.log('Form Submited');
  console.log(this.usuario);
}
}
