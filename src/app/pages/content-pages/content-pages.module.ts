import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentPagesRoutingModule } from './content-pages-routing.module';

import { ChoosePlanPageComponent } from './choose-plan-page/choose-plan-page.component';
import { ErrorPageComponent } from './error/error-page.component';

@NgModule( {
  declarations: [
    ChoosePlanPageComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    ContentPagesRoutingModule
  ]
} )
export class ContentPagesModule { }
