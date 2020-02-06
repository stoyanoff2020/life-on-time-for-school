import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Idea } from 'app/shared/models/idea';

@Component( {
  selector: 'app-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: [ './ideas-list.component.scss' ]
} )
export class IdeasListComponent {
  @Input( 'idea' ) idea: Idea;
  @Input( 'ideas' ) ideas: Array<Idea>;
  @Input( 'selectedIdeaId' ) selectedIdeaId: string;
  @Output() showIdea: EventEmitter<any> = new EventEmitter();

  onIdea( event, idea: Idea ) {
    this.showIdea.emit( { event, idea } );
  }
}
