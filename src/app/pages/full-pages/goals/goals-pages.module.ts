import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GoalsPageComponent } from './goals-page.component';
import { SingleGoalCardComponent } from './single-goal-card/single-goal-card.component';
import { SingleActionComponent } from './single-action/single-action.component';

@NgModule( {
  exports: [
    GoalsPageComponent,
  ],
  declarations: [
    GoalsPageComponent,
    SingleGoalCardComponent,
    SingleActionComponent,
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
} )
export class GoalsPagesModule {

}
