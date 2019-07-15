import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestoranPage } from './restoran';

@NgModule({
  declarations: [
    RestoranPage,
  ],
  imports: [
    IonicPageModule.forChild(RestoranPage),
  ],
})
export class RestoranPageModule {}
