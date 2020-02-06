import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllGoalsPageComponent } from './all-goals-page/all-goals-page.component';
import { SingleAllGoalsCardComponent } from './single-all-goals-card/single-all-goals-card.component';

@NgModule( {
  declarations: [
    AllGoalsPageComponent,
    SingleAllGoalsCardComponent
  ],
  imports: [
    CommonModule
  ]
} )
export class AllGoalsPageModule { }
