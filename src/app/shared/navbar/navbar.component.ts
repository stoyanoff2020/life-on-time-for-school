import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  Renderer2
} from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component( {
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: [ "./navbar.component.scss" ]
} )
export class NavbarComponent implements OnInit, AfterViewInit {
  // currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  private logoutSubscription: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor (
    // public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) {
    // const browserLang: string = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");

  }

  ngOnInit() {
    this.config = this.configService.templateConf;
  }

  logout() {
    this.logoutSubscription =
      this.authService.logout()
        .subscribe( data => {
          this.authService.deleteToken( 'token' );
          //this.authService.deleteCookie( 'token' ); ----with token in cookie
          this.router.navigate( [ "/user/login" ] );
        } )
  }

  ngOnDestroy() {
    if ( this.logoutSubscription ) {
      this.logoutSubscription.unsubscribe();
    }
  }

  showCustomizer() {
    const customizer: Element = this.renderer.selectRootElement( '.customizer', true );
    this.renderer.addClass( customizer, "open" );
  }

  ngAfterViewInit() {
    if ( this.config.layout.dir ) {
      const dir = this.config.layout.dir;
      if ( dir === "rtl" ) {
        this.placement = "bottom-left";
      } else if ( dir === "ltr" ) {
        this.placement = "bottom-right";
      }
    }
  }


  // ChangeLanguage(language: string) {
  //   this.translate.use(language);
  // }

  ToggleClass() {
    if ( this.toggleClass === "ft-maximize" ) {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange( true );
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName( "app-sidebar" )[ 0 ];
    if ( appSidebar.classList.contains( "hide-sidebar" ) ) {
      this.toggleHideSidebar.emit( false );
    } else {
      this.toggleHideSidebar.emit( true );
    }
  }
}
