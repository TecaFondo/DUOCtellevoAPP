import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  usuario: any;
constructor(private route: ActivatedRoute) {
  /*this.route.paramMap.subscribe(
  (data)=> {
    console.log(data)
  }
  )*/
  this.usuario = this.route.snapshot.paramMap.get('nombre')
}



}
