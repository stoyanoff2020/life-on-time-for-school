import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GoalsPageComponent } from './goals-page.component';
import { SingleGoalCardComponent } from './single-goal-card/single-goal-card.component';
import { SingleActionComponent } from './single-action/single-action.component';
import { CardTextComponent } from './card-text/card-text.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule( {
  exports: [
    GoalsPageComponent,
  ],
  declarations: [
    GoalsPageComponent,
    SingleGoalCardComponent,
    SingleActionComponent,
    CardTextComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
  ],
} )
export class GoalsPagesModule {

}
