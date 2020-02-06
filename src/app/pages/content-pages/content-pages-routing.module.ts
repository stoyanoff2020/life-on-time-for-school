import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonAuthGuard } from 'app/shared/auth/non-auth-guard.service';

import { ChoosePlanPageComponent } from './choose-plan-page/choose-plan-page.component';
import { ErrorPageComponent } from './error/error-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'choose-plan',
        component: ChoosePlanPageComponent,
        canActivate: [ NonAuthGuard ]
      },
      {
        path: 'error',
        component: ErrorPageComponent,
      },
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ContentPagesRoutingModule { }
