import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTextComponent } from './card-text/card-text.component';
import { CardVideoComponent } from './card-video/card-video.component';
import { CardAudioComponent } from './card-audio/card-audio.component';
import { WellbeingPagesComponent } from './wellbeing-pages/wellbeing-pages.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule( {
  declarations: [
    CardTextComponent,
    CardVideoComponent,
    CardAudioComponent,
    WellbeingPagesComponent,
  ],
  exports: [
    CardTextComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
} )
export class WellbeingPagesModule { }
