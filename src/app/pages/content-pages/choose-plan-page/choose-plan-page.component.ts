import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationService } from 'app/shared/services/application.service';
import { AppType } from 'app/shared/models/appType';
import { GlobalService } from 'app/shared/services/global.service';

@Component( {
  selector: 'app-choose-plan-page',
  templateUrl: './choose-plan-page.component.html',
  styleUrls: [ './choose-plan-page.component.scss' ]
} )
export class ChoosePlanPageComponent implements OnInit {

  public applicationTypes$: Observable<Array<AppType>>;

  constructor (
    private applicationService: ApplicationService,
    private globalService: GlobalService,
    private router: Router ) { }

  ngOnInit() {
    this.applicationTypes$ = this.applicationService.getAplicationTypes();
  }

  onRegister( event, appInfo: AppType ) {
    this.globalService.setChoosenAppTypeInfo( appInfo );
    this.router.navigateByUrl( '/user/register' );
  }
}
