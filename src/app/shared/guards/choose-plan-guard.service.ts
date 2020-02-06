import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';


@Injectable( {
  providedIn: 'root'
} )
export class ChoosePlanGuard implements CanActivate {

  constructor (
    private globalService: GlobalService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.globalService.getChoosenAppTypeInfo() ) {
      return true;
    }

    this.router.navigate( [ '/choose-plan' ] );

    return false;
  }
}
