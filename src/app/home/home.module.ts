import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    Geolocation
  ],
  providers: [
    { provide: Geolocation, useValue: {} }
   ],
  declarations: [HomePage]
})
export class HomePageModule {}
