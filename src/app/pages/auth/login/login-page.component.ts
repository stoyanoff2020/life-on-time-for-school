import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs';
import { ApplicationService } from 'app/shared/services/application.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { GlobalService } from 'app/shared/services/global.service';
import { UserService } from 'app/shared/services/user.service';

@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )

export class LoginPageComponent implements OnInit, OnDestroy {

  @ViewChild( 'loginForm', { static: true } ) loginForm: NgForm;

  schoolLogo: string;
  schoolName: string;
  private loginSubs: Subscription;
  private appSettingsSubs: Subscription;
  private userSubs: Subscription;

  constructor (
    private authService: AuthService,
    private appService: ApplicationService,
    private globalService: GlobalService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.appSettingsSubs =
      this.appService
        .getAppSettings()
        .subscribe( settings => {
          console.log( settings );
          this.schoolLogo = settings.schoolLogo;
          this.schoolName = settings.schoolName;
          this.globalService.setAppSettings( settings );
        } )
  }

  // On submit button click
  login() {
    this.loginSubs = this.authService
      .loginUser( this.loginForm.value )
      .subscribe( data => {
        if ( this.loginForm.valid ) {
          this.authService.setToken( data[ 'data' ].token );
          this.userSubs =
            this.userService
              .getUserAvailableCategoriesAndUserClass()
              .subscribe( data => {
                this.globalService.setAppCategories( data.categories );
                this.globalService.setUserClass( data.class );
                this.loginForm.reset();
                this.router.navigate( [ '/progress-dashboard' ] );
              } )
        }
      } )
  }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate( [ '/forgotpassword' ], { relativeTo: this.route.parent } );
  }

  NavigateToRegister() {
    this.router.navigate( [ '/choose-plan' ] );
  }

  ngOnDestroy(): void {
    if ( this.loginSubs ) {
      this.loginSubs.unsubscribe();
    }
    if ( this.appSettingsSubs ) {
      this.appSettingsSubs.unsubscribe();
    }
    if ( this.userSubs ) {
      this.userSubs.unsubscribe();
    }
  }
}
