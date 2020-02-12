import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { Router } from "@angular/router";
import { customAnimations } from "../animations/custom-animations";
import { Subscription } from 'rxjs';

import { ROUTES } from './sidebar-routes.config';
import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service'
import { Category } from '../models/category';
import { ApplicationService } from '../services/application.service';


@Component( {
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: [ "./sidebar.component.scss" ],
  animations: customAnimations
} )
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input( 'logoUrl' ) logoUrl: string;
  @Input( 'schoolName' ) schoolName: string;

  public menuItems: any[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  public config: any = {};
  private availableCategoriesSubs: Subscription;
  private appSettingsSubs: Subscription;

  constructor (
    private router: Router,
    private configService: ConfigService,
    private userService: UserService,
    private globalService: GlobalService,
  ) {
    if ( this.depth === undefined ) {
      this.depth = 0;
      this.expanded = true;
    }
  }

  ngOnInit() {
    this.config = this.configService.templateConf;

    const goalsMenu = ROUTES.find( m => m.title === 'Values' );
    goalsMenu[ 'submenu' ] = [];

    let categories = this.globalService.getAppCategories();

    if ( categories ) {
      this.inputInfoSubmenubar( categories, goalsMenu );
    } else {
      this.availableCategoriesSubs = this.userService.getUserAvailableCategoriesAndUserClass()
        .subscribe( studentInfo => {
          this.globalService.setAppCategories( studentInfo.categories );
          this.globalService.setUserClass( studentInfo.class );
          this.inputInfoSubmenubar( studentInfo.categories, goalsMenu );
        } );
    }



    // if ( this.config.layout.sidebar.backgroundColor === 'white' ) {
    //   this.logoUrl = 'assets/img/logo-dark.png';
    // }
    // else {
    //   this.logoUrl = 'assets/img/logo.png';
    // }

  }

  ngAfterViewInit() {

    setTimeout( () => {
      if ( this.config.layout.sidebar.collapsed != undefined ) {
        if ( this.config.layout.sidebar.collapsed === true ) {
          this.expanded = false;
          this.nav_collapsed_open = true;
        }
        else if ( this.config.layout.sidebar.collapsed === false ) {
          this.expanded = true;
          this.nav_collapsed_open = false;
        }
      }
    }, 0 );
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle( titles ) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction( path: string ) {
    if ( path.indexOf( "forms/ngx" ) !== -1 )
      this.router.navigate( [ "forms/ngx/wizard" ], { skipLocationChange: false } );
  }

  private inputInfoSubmenubar( categories: Array<Category>, goalsMenu ) {
    categories.forEach( category => {
      goalsMenu[ 'submenu' ].push(
        {
          path: `/values/${category.pathEnd}`,
          title: category.title,
          icon: '',
          class: '',
          badge: '',
          badgeClass: '',
          isExternalLink: false,
          submenu: []
        }
      )
    } );
    this.menuItems = ROUTES;
  }

  ngOnDestroy(): void {
    if ( this.availableCategoriesSubs ) {
      this.availableCategoriesSubs.unsubscribe();
    }
    if ( this.appSettingsSubs ) {
      this.appSettingsSubs.unsubscribe();
    }
  }
}
