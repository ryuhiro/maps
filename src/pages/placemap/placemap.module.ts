import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacemapPage } from './placemap';

@NgModule({
  declarations: [
    PlacemapPage,
  ],
  imports: [
    IonicPageModule.forChild(PlacemapPage),
  ],
})
export class PlacemapPageModule {}
