import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class ResponceHandlerInterceptor implements HttpInterceptor {
  constructor (
    private toastr: ToastrService,
    private router: Router
  ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    return next.handle( req )
      .pipe( tap( evt => {
        if ( evt instanceof HttpResponse ) {
          //console.log( evt );
          if ( evt.status === 201 ) {
            console.log( 'status=201', evt.statusText )
            // this.toastr.success( evt.statusText, 'Success:', { positionClass: 'toast-top-center' } );
          } else if ( evt.status === 200 && evt.body.message ) {
            console.log( 'status=200', evt.body.message )
            //this.toastr.success( evt.body.message, 'Success:' );
          }
        }
      } ), catchError( ( err: any ) => {
        if ( err instanceof HttpErrorResponse ) {
          try {
            //400 must be 401
            if ( err.status === 400 ) {
              //console.log( err.status )
              this.toastr.error( err.error.error, 'Error:', {
                closeButton: true,
                timeOut: 5000,
                onActivateTick: true
              } );
              this.router.navigate( [ '/user/login' ] );
            } else if ( err.status === 401 ) {
              console.log( err.status )
              // this.toastr.error( err.error.error, 'Error:', {
              //   closeButton: true,
              //   timeOut: 5000,
              //   onActivateTick: true
              // } );
              this.router.navigate( [ '/user/login' ] );
            }
            else if ( err.error.error ) {
              console.log( "err.error.error", err.error.error )
              this.toastr.error( err.error.error, 'Error:', {
                closeButton: true,
                timeOut: 5000,
                onActivateTick: true
              } );
            } else if ( err.error.message ) {
              //console.log( err.error.message )
              this.toastr.error( err.error.message, 'Error:' );
            } else if ( err.message ) {
              console.log( 'err.error.error', err.message )
              this.toastr.error( err.message, 'Error:', {
                positionClass: "toast-top-full-width",
                closeButton: true,
                timeOut: 5000,
              } );
            }
          } catch ( e ) {
            console.log( e )
            // this.toastr.error( 'An error occurred', '',
            //   {
            //     positionClass: "toast-top-full-width",
            //     timeOut: 5000,
            //     //onActivateTick: true
            //   } );
          }
        }
        throw ( err );
      } ) );

  }
}
