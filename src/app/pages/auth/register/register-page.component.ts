import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'app/shared/auth/auth.service';
import { RegisterUser } from 'app/shared/models/registerUser';
import { GlobalService } from 'app/shared/services/global.service';
import { Subscription } from 'rxjs';
import { AppType } from 'app/shared/models/appType';


@Component( {
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [ './register-page.component.scss' ]
} )

export class RegisterPageComponent implements OnInit, OnDestroy {
  @ViewChild( 'registerForm', { static: false } ) registerForm: NgForm;

  private user: RegisterUser;
  private registerSubsc: Subscription;
  appTypeInfo: AppType;

  constructor (
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.appTypeInfo = this.globalService.getChoosenAppTypeInfo();
  }

  //  On submit click, reset field value
  ngOnDestroy(): void {
    if ( this.registerSubsc ) {
      this.registerSubsc.unsubscribe();
    }
  }

  register() {
    this.user = this.registerForm.value;
    this.user[ 'appliction_type_id' ] = this.appTypeInfo.id;
    if ( this.user.acceptTerms && this.user[ 'appliction_type_id' ] ) {
      this.registerSubsc = this.authService
        .registerUser( this.user )
        .subscribe( ( data ) => {
          if ( this.registerForm.valid ) {
            this.registerForm.reset();
            this.router.navigate( [ '/user/login' ] );
          }
        } )
    }

  }
}
