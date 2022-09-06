import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: any;
constructor(private route: ActivatedRoute) {
  this.usuario = this.route.snapshot.paramMap.get('nombre')
}



}
