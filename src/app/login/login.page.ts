import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { Validators, FormControl, FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  ios: boolean; //esto es para detectar cuando un dispositivo es iOS
  android: boolean; //same with android

  usuario={
    nombre:'',
    password:''
  }
  constructor(private router:Router, public platform: Platform) { //valida tipo dispositivo (android o ios)
    this.ios = platform.is('ios');
    this.android = platform.is('android');
}

onSubmitTemplate(){ //Muestra datos de usuario (si son correctos <cumplen validacion>)
  console.log('Form Submited');
  console.log(this.usuario);

  this.router.navigate(['home/',this.usuario.nombre])

}
}

