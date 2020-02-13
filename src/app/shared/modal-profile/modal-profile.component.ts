import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ActionInfo } from '../models/actionInfo';
import { SeparatedDate } from '../models/date';
import { UserInfo } from '../models/userInfo';

@Component( {
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: [ './modal-profile.component.scss' ]
} )
export class ModalProfileComponent implements OnInit {
  user: UserInfo;
  actionType: string;
  itemType: string;
  modalForm: FormGroup;

  constructor (
    public modal: NgbActiveModal,
    private eventService: EventService,
    private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.modalForm = this.formBuilder.group( {
      mood: [ String( this.user.mood ), [ Validators.required ] ],
      email: [ this.user.email, [ Validators.email, Validators.required ] ],
      password: [ '', [ Validators.maxLength( 15 ), Validators.minLength( 2 ) ] ],
      confirmPassword: [ '' ],
    } );
  }

  get mood() { return this.modalForm.get( 'mood' ) };
  get email() { return this.modalForm.get( 'email' ) };
  get password() { return this.modalForm.get( 'password' ) };
  get confirmPassword() { return this.modalForm.get( 'confirmPassword' ) };

  close() {
    this.modalForm.reset();
    this.modal.close( 'Modal Form Closed' )
  }

  onSave( actionType: string, itemType: string ) {
    const actionInfo: ActionInfo = {
      actionType,
      itemType,
      formValue: this.modalForm.value,
    }
    this.eventService.emit(
      {
        name: 'edit user profile',
        value: actionInfo
      }
    )
    this.modal.dismiss( 'Save Choosed, Modal Form Closed' );
  }

}
