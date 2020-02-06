import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import {
  DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG
} from 'ngx-dropzone-wrapper';

//import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from 'environments/environment';

import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { IdeasListComponent } from './ideas-list/ideas-list.component';
import { IdeasPageComponent } from './ideas-page.component';
import { IdeaFilesComponent } from './idea-files/idea-files.component';


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
  maxFilesize: 500
};

@NgModule( {
  declarations: [
    IdeasPageComponent,
    IdeaFilesComponent,
    IdeaDetailsComponent,
    IdeasListComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    DropzoneModule,
    QuillModule,
    PerfectScrollbarModule,
    SharedModule
    //FlexLayoutModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
} )
export class IdeasPageModule { }
