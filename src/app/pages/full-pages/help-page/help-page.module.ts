import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpPageComponent } from './help-page/help-page.component';
import { WellbeingPagesModule } from '../wellbeing/wellbeing-pages.module';
import { CardTextComponent } from '../wellbeing/card-text/card-text.component';

@NgModule( {
  declarations: [
    HelpPageComponent,
  ],
  imports: [
    CommonModule,
    WellbeingPagesModule,
  ]
} )
export class HelpPageModule { }
