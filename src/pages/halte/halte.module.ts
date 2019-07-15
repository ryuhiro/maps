import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HaltePage } from './halte';

@NgModule({
  declarations: [
    HaltePage,
  ],
  imports: [
    IonicPageModule.forChild(HaltePage),
  ],
})
export class HaltePageModule {}
