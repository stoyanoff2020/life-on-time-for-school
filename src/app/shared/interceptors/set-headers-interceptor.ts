import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SetHeadersInterceptor implements HttpInterceptor {
  constructor (
    private authService: AuthService
  ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken( 'token' );

    if ( !req.url.includes( '/auth/' ) && !req.url.includes( '/uploads/' ) && !req.url.includes( '/wp-json/' )
      && !req.url.includes( '/app/aplicationtypes' )
    ) {
      const request = req.clone( {
        setHeaders: {
          'Content-Type': 'application/json',
          'Auth-Token': token ? token : '',
        },
        // withCredentials: true
      } );
      //console.log( request );
      return next.handle( request );
    }

    return next.handle( req );
  }
}
