import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajePageRoutingModule } from './viaje-routing.module';
import { Geolocation } from '@ionic-native/geolocation';

import { ViajePage } from './viaje.page';
import { GoogleMap } from '@capacitor/google-maps';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajePageRoutingModule,
    GoogleMap,
    ViajePageRoutingModule
  ],
  declarations: [ViajePage],
})
export class ViajePageModule {
  }
