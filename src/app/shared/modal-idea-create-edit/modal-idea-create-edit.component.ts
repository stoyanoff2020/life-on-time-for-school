import {
  Component,
  OnInit,
  Input,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../services/event.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActionInfo } from '../models/actionInfo';
//import { SpeechRecognitionService } from '../services/speech-recognition.service';

declare let webkitSpeechRecognition: any;

@Component( {
  selector: 'app-modal-idea-create-edit',
  templateUrl: './modal-idea-create-edit.component.html',
  styleUrls: [ './modal-idea-create-edit.component.scss' ]
} )
export class ModalIdeaCreateEditComponent implements OnInit {
  @Input() item: any;
  @ViewChild( 'nameInput', { static: false } ) ideaTitle;
  @ViewChild( 'contentInput', { static: false } ) ideaDescription;
  modalForm: FormGroup;
  itemType: string;
  actionType: string;
  isFromIdea: boolean = false;
  isListeningName: boolean = false;
  isListeningContent: boolean = false;

  constructor (
    public modal: NgbActiveModal,
    private eventService: EventService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.modalForm = this.formBuilder.group( {
      name: [ this.item.name, [ Validators.required ] ],
      info: this.formBuilder.group( {
        content: [ this.item.info.content, ],
      } )
    } );
  }

  get name() { return this.modalForm.get( 'name' ) };
  get content() { return this.modalForm.get( 'info.content' ) };

  close() {
    this.modalForm.reset();
    this.modal.close( 'Modal Form Closed' )
  }

  onAction( actionType: string, itemType: string, itemId?: string, ) {
    const actionInfo: ActionInfo = {
      actionType,
      itemType,
      itemId,
      formValue: this.modalForm.value,
    }
    this.eventService.emit(
      {
        name: 'confirm create/edit',
        value: actionInfo
      }
    )
    this.modal.dismiss( 'Action Choosed, Modal Form Closed' );
  }

  StartListening( formControlName: string ) {
    let final_transcript = '';
    const recognition = new webkitSpeechRecognition();
    if ( formControlName === 'name' ) {
      this.isListeningName = !this.isListeningName;
      if ( !this.isListeningName ) {
        recognition.stop();
        return;
      }
    } else if ( formControlName === 'content' ) {
      this.isListeningContent = !this.isListeningContent;
      if ( !this.isListeningContent ) {
        recognition.stop();
        return;
      }
    }

    if ( 'webkitSpeechRecognition' in window ) {

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      recognition.start();

      recognition.onresult = ( event ) => {
        let interim_transcript = '';

        for ( let i = event.resultIndex; i < event.results.length; ++i ) {
          if ( event.results[ i ].isFinal ) {
            final_transcript += event.results[ i ][ 0 ].transcript;
          } else {
            interim_transcript += event.results[ i ][ 0 ].transcript;
          }
        }

        if ( formControlName === 'name' ) {
          if ( interim_transcript !== '' ) {
            this.modalForm.patchValue( { name: final_transcript + interim_transcript } );
          } else if ( final_transcript !== '' ) {
            this.modalForm.patchValue( { name: final_transcript } );
          }
        } else if ( formControlName === 'content' ) {
          if ( interim_transcript !== '' ) {
            this.modalForm.patchValue(
              {
                info: {
                  content: final_transcript + interim_transcript
                }
              } );
          } else if ( final_transcript !== '' ) {
            this.modalForm.patchValue(
              {
                info: {
                  content: final_transcript
                }
              } );
          }
        }
      }

      recognition.onerror = function ( error ) {
        recognition.stop();
        this.isListeningName = false;
        this.isListeningContent = false;
        //console.log( error );
      }

      recognition.onspeechend = function () {
        this.isListeningName = false;
        this.isListeningContent = false;
      }
    } else {
      alert( 'Your browser dont support speech recognition' );
      this.isListeningName = false;
      this.isListeningContent = false;
    }
  }
}
