import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PlacemapPage } from '../pages/placemap/placemap';
import { ListModalPage } from '../pages/list-modal/list-modal';
import { ListNearPage } from '../pages/list-near/list-near';
import { RumahSakitPage } from '../pages/rumah-sakit/rumah-sakit';
import { SpbuPage } from '../pages/spbu/spbu';
import { RestoranPage } from '../pages/restoran/restoran';
import { StasiunPage } from '../pages/stasiun/stasiun';
import { HaltePage } from '../pages/halte/halte';
import { CafePage } from '../pages/cafe/cafe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleNearby } from '@ionic-native/google-nearby/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PlacemapPage,
    ListModalPage,
    ListNearPage,
    RumahSakitPage,
    SpbuPage,
    RestoranPage,
    StasiunPage,
    HaltePage,
    CafePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PlacemapPage,
    ListModalPage,
    ListNearPage,
    RumahSakitPage,
    SpbuPage,
    RestoranPage,
    StasiunPage,
    HaltePage,
    CafePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleNearby,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
