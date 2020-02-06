import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { EventService } from '../services/event.service';

@Component( {
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: [ './modal-upload.component.scss' ]
} )
export class ModalUploadComponent {
  private dropzone;
  isImages: boolean;
  userId: string;

  configFileDrop: DropzoneConfigInterface = {
    acceptedFiles: '.pdf, .doc, .docx, .rtf',
    dictDefaultMessage: 'Click or Drop files for upload here'
    //filesizeBase: number;
  };

  configImageDrop: DropzoneConfigInterface = {
    acceptedFiles: 'image/*',
    dictDefaultMessage: 'Click or Drop images for upload here'
  };

  constructor (
    public modal: NgbActiveModal,
    private eventService: EventService
  ) { }

  onUploadInit( args: any ): void {
    this.dropzone = args;
    //console.log( 'onUploadInit:', args );
  }

  onUploadError( args: any ): void {
    alert( `File "${args[ 0 ].name}" - ${args[ 1 ]}` );
    //console.log( 'onUploadError:', args );
  }

  onUploadSuccess( args: any ): void {
    this.eventService.emit(
      {
        name: 'upload success',
        value: args[ 1 ]
      }

    )
    //console.log( "onUploadSuccess", args );
  }
  onUploadQueueComplete( event ) {
    //console.log( event );
  }

  onSending( data, userId: string ): void {
    //console.log( 'onSending', data );
    // data [ File , xhr, formData]
    //const file = data[ 0 ];
    const formData = data[ 2 ];
    formData.append( 'userId', userId );
    formData.append( 'operation', 'insert' );
  }

  upload() {
    this.dropzone.processQueue();
  }
  // multiple upload
  // canceledMultiple( event ) {
  //   console.log( 'canceledMultiple', event )
  // }

  // successMultiple( event ) {
  //   console.log( 'successMultiple', event )
  // }

  // sendingMultiple( event ) {
  //   console.log( 'sendingMultiple', event )
  // }

}
