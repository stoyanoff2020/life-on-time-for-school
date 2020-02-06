import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard-page/progress-dashboard.component';
import { GoalsPageComponent } from './goals/goals-page.component';
import { IdeasPageComponent } from './ideas/ideas-page.component';
import { WellbeingPagesComponent } from './wellbeing/wellbeing-pages/wellbeing-pages.component';
import { HelpPageComponent } from './help-page/help-page/help-page.component';
import { CalendarPageComponent } from './calendar/calendar-page/calendar-page.component';
import { AllGoalsPageComponent } from './goals/allGoalsPage/all-goals-page/all-goals-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'progress-dashboard',
        component: ProgressDashboardComponent,
      },
    ]
  },
  {
    path: 'values',
    children: [
      {
        path: 'all',
        pathMatch: 'full',
        component: AllGoalsPageComponent,
      },
      {
        path: '**',
        component: GoalsPageComponent,
      },
    ]
  },
  {
    path: 'ideas',
    component: IdeasPageComponent
  },
  // {
  //   path: 'wellbeing',
  //   children: [
  //     {
  //       path: 'relax-me',
  //       component: WellbeingPagesComponent
  //     },
  //     {
  //       path: 'inspire-me',
  //       component: WellbeingPagesComponent
  //     },
  //     {
  //       path: 'teach-me',
  //       component: WellbeingPagesComponent
  //     }
  //   ]
  // },
  {
    path: 'help',
    component: HelpPageComponent
  },
  {
    path: 'calendar',
    component: CalendarPageComponent
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class FullPagesRoutingModule { }
