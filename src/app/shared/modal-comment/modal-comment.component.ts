
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ActionInfo } from '../models/actionInfo';


@Component( {
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrls: [ './modal-comment.component.scss' ]
} )
export class ModalCommentComponent implements OnInit {
  actionType: string;
  itemType: string;
  itemId: string;
  itemStatus: string;
  modalForm: FormGroup;

  constructor (
    public modal: NgbActiveModal,
    private eventService: EventService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.modalForm = this.formBuilder.group( {
      feedback: [ '' ],
    } );
  }

  get comment() { return this.modalForm.get( 'comment' ) };

  close() {
    this.modalForm.reset();
    this.modal.close( 'Modal Form Closed' )
  }

  onAddComment( actionType: string, itemType: string, itemId: string, status: string ): void {
    const actionInfo: ActionInfo = {
      actionType,
      itemType,
      itemId,
      formValue: this.modalForm.value,
      status,
    }
    this.eventService.emit(
      {
        name: 'addComment',
        value: actionInfo
      }
    )
    this.modal.dismiss( 'addComment Choosed, Modal Form Closed' );
  }

  onSkip( actionType: string, itemType: string, itemId: string, status: string ): void {
    const actionInfo: ActionInfo = {
      actionType,
      itemType,
      itemId,
      status
    }
    this.eventService.emit(
      {
        name: 'skipComment',
        value: actionInfo
      }
    )
    this.modal.dismiss( 'Skip Comment Choosed, Modal Form Closed' );
  }

}
