import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output } from '@angular/core';
import { ModalService } from 'app/shared/services/modal.service';
import { Idea } from 'app/shared/models/idea';
import { AuthService } from 'app/shared/auth/auth.service';
import { environment } from 'environments/environment';

@Component( {
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: [ './idea-details.component.scss' ]
} )
export class IdeaDetailsComponent implements OnInit {

  private _idea: Idea;

  @Input( 'idea' )
  set idea( idea: Idea ) {
    this._idea = idea;
  }

  get idea(): Idea {
    return this._idea;
  }

  @Input( 'isIdeaSelected' ) isIdeaSelected: boolean;
  @ViewChild( 'ideaContent', { static: false } ) content: ElementRef;
  @Output() clickAllIdeas: EventEmitter<any> = new EventEmitter();

  userId: string;
  fileStartUrl: string;


  constructor (
    private modalService: ModalService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.userId = this.authService.getUserIdFromToken( 'token' );
    this.fileStartUrl = `${environment.fileUplodeUrl}files/${this.userId}`;
  }

  openModal( name: string, itemType: string, actionType: string, item?: any ) {
    this.modalService.open( name, itemType, actionType, item )
  }

  onAllIdeas() {
    this.clickAllIdeas.emit();
  }
}
