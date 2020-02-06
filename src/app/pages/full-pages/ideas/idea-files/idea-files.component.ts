import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IdeaFile } from 'app/shared/models/idea';
import { ModalService } from 'app/shared/services/modal.service';

@Component( {
  selector: 'app-idea-files',
  templateUrl: './idea-files.component.html',
  styleUrls: [ './idea-files.component.scss' ]
} )
export class IdeaFilesComponent implements OnChanges {

  @Input( 'files' ) files: Array<IdeaFile>;
  @Input( 'ideaId' ) ideaId: string;
  @Input( 'isImages' ) isImages: boolean;
  @Input( 'fileType' ) fileType: string;
  @Input( 'userId' ) userId: string;
  @Input( 'fileStartUrl' ) fileStartUrl: string;

  isIdeaFilesCollapsed = true;

  constructor (
    private modalService: ModalService,
  ) {
  }

  openModal( name: string, itemType: string, actionType: string, itemInfo: any ) {
    this.modalService.open( name, itemType, actionType, itemInfo );
  }

  ngOnChanges( changes: SimpleChanges ) {
    if ( changes[ 'ideaId' ] ) {
      this.isIdeaFilesCollapsed = true;
    }
  }
}
