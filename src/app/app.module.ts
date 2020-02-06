
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from "./shared/shared.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppComponent } from './app.component';
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth-guard.service';
import { ApplicationService } from './shared/services/application.service';
import { GoalService } from './shared/services/goal.service';
import { TaskService } from './shared/services/task.service';
import { IdeaService } from './shared/services/idea.service';
import { CookieService } from 'ngx-cookie-service';

import { ResponceHandlerInterceptor } from './shared/interceptors/responce-handler-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SetHeadersInterceptor } from './shared/interceptors/set-headers-interceptor';
import { ModalService } from './shared/services/modal.service';
import { EventService } from './shared/services/event.service';
import { UserService } from './shared/services/user.service';
import { PostService } from './shared/services/post.service';
import { GlobalService } from './shared/services/global.service';
import { SpeechRecognitionService } from './shared/services/speech-recognition.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader( http: HttpClient ) {
  return new TranslateHttpLoader( http, "./assets/i18n/", ".json" );
}


@NgModule( {
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot( {
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [ HttpClient ]
      }
    } ),
    PerfectScrollbarModule,
    ToastrModule.forRoot( {
      toastClass: 'toast toast-bootstrap-compatibility-fix'
    } ),


  ],
  providers: [
    AuthService,
    ApplicationService,
    GoalService,
    TaskService,
    IdeaService,
    AuthGuard,
    UserService,
    ModalService,
    PostService,
    CookieService,
    GlobalService,
    EventService,
    SpeechRecognitionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SetHeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponceHandlerInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [ AppComponent ],

} )
export class AppModule { }
