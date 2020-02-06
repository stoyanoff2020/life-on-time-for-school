import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

//Components
import { LoginPageComponent } from './login/login-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule( {
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
  ],
} )
export class AuthModule { }
