import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { BrowserTransferStateModule } from '@angular/platform-browser';
import {
    DropzoneModule,
    DropzoneConfigInterface,
    DROPZONE_CONFIG
} from 'ngx-dropzone-wrapper';

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalCreateEditComponent } from './modal-create-edit/modal-create-edit.component';
import { ModalIdeaCreateEditComponent } from './modal-idea-create-edit/modal-idea-create-edit.component';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { ModalCommentComponent } from './modal-comment/modal-comment.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarDirective } from './directives/sidebar.directive';
import { SidebarLinkDirective } from './directives/sidebarlink.directive';
import { SidebarListDirective } from './directives/sidebarlist.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebaranchortoggle.directive';
import { SidebarToggleDirective } from './directives/sidebartoggle.directive';
import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';

import { environment } from 'environments/environment';

import { SafePipe } from './pipes/safe-pipe';
import { ModalProfileComponent } from './modal-profile/modal-profile.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: environment.fileUplodeUrl,
    //acceptedFiles: 'image/*',
    //createImageThumbnails: true,
    // headers: { "Authorization": `Client-ID ${clientID}` },
    clickable: true,
    maxFiles: 10,
    parallelUploads: 10,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    autoQueue: true,
    autoProcessQueue: false,
    maxFilesize: 500,
    //uploadMultiple: true,
};


@NgModule( {
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        ConfirmEqualValidatorDirective,
        SafePipe,
        SidebarDirective,
        NgbModule,
        TranslateModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        TranslateModule,
        PerfectScrollbarModule,
        DropzoneModule,
        BrowserTransferStateModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        SidebarLinkDirective,
        SidebarListDirective,
        SidebarAnchorToggleDirective,
        SidebarToggleDirective,
        ConfirmEqualValidatorDirective,
        SafePipe,
        CustomizerComponent,
        ModalConfirmComponent,
        ModalCreateEditComponent,
        ModalIdeaCreateEditComponent,
        ModalUploadComponent,
        ModalCommentComponent,
        ModalProfileComponent,
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ],
    entryComponents: [
        ModalConfirmComponent,
        ModalCreateEditComponent,
        ModalIdeaCreateEditComponent,
        ModalUploadComponent,
        ModalCommentComponent,
        ModalProfileComponent,
    ]
} )
export class SharedModule { }
