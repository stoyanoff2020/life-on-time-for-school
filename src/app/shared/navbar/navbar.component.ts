import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';
import { EventService } from '../services/event.service';
import { ActionInfo } from '../models/actionInfo';
import { NewUserInfo } from '../models/userInfo';

@Component( {
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: [ "./navbar.component.scss" ]
} )
export class NavbarComponent implements OnInit, AfterViewInit {
  // currentLang = "en";
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  userInfo: any;
  public isCollapsed = true;
  private logoutSubscription: Subscription;
  private userInfoSubsc: Subscription;
  private modalEditUserProfileSubs: Subscription;
  private editUserProfileSubs: Subscription;


  public config: any = {};

  constructor (
    // public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private authService: AuthService,
    private modalService: ModalService,
    private userService: UserService,
    private eventService: EventService,
    private router: Router,
    private renderer: Renderer2
  ) {
    // const browserLang: string = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");

  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.modalEditUserProfileSubs = this.eventService.on( 'edit user profile', ( actionInfo => this.editUserProfile( actionInfo ) ) )
  }
  private editUserProfile( actionInfo: ActionInfo ) {
    console.log( actionInfo );
    const newUserInfo: NewUserInfo = {
      mood: actionInfo.formValue[ 'mood' ],
      email: actionInfo.formValue[ 'email' ],
      password: actionInfo.formValue[ 'password' ],
      confirmPassword: actionInfo.formValue[ 'confirmPassword' ],
    }
    this.editUserProfileSubs = this.userService.putEditCurrentUserInfo( newUserInfo )
      .subscribe( data => console.log( data ) );
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
    if ( this.userInfoSubsc ) {
      this.userInfoSubsc.unsubscribe();
    }
    if ( this.modalEditUserProfileSubs ) {
      this.modalEditUserProfileSubs.unsubscribe();
    }
    if ( this.editUserProfileSubs ) {
      this.editUserProfileSubs.unsubscribe();
    }
  }

  showCustomizer() {
    const customizer: Element = this.renderer.selectRootElement( '.customizer', true );
    this.renderer.addClass( customizer, "open" );
  }

  //('openProfileModal', 'userProfile', 'edit', 'userInfo')
  openProfileModal( modalName: string, itemType: string, actionType: string, itemInfo?: any ) {
    this.userInfoSubsc =
      this.userService.getCurrenrUserInfo()
        .subscribe( user => {
          this.modalService.open( modalName, itemType, actionType, user );
          console.log( 'open profile' );
        } )
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
