import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )

export class LoginPageComponent implements OnDestroy {
  @ViewChild( 'loginForm', { static: true } ) loginForm: NgForm;

  private loginSubscription: Subscription;

  constructor (
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute ) { }

  // On submit button click
  login() {
    this.loginSubscription = this.authService
      .loginUser( this.loginForm.value )
      .subscribe( data => {
        this.authService.setToken( data[ 'data' ].token );
        if ( this.loginForm.valid ) {
          this.loginForm.reset();
          this.router.navigate( [ '/progress-dashboard' ] );
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
    if ( this.loginSubscription ) {
      this.loginSubscription.unsubscribe();
    }
  }
}
