import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogPost } from 'app/shared/models/blogPost';

@Component( {
  selector: 'app-card-text',
  templateUrl: './card-text.component.html',
  styleUrls: [ './card-text.component.scss' ]
} )
export class CardTextComponent implements OnInit {
  @Input() post: BlogPost;

  constructor (
    private modalService: NgbModal
  ) { }

  ngOnInit(

  ) {
  }

  open( content: TemplateRef<any> ) {
    const modalRef = this.modalService.open( content, { size: 'lg' } );

    modalRef.result.then( ( result ) => {
      console.log( result );
    } ).catch( ( error ) => {
      console.log( error );
    } );
  }
}
