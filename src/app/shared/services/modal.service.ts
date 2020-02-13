import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Modals } from "../models/modals";
import { SeparatedDate } from "../models/date";
import { GlobalService } from './global.service';

@Injectable( {
  providedIn: 'root'
} )
export class ModalService {
  //private closeResult: string;

  constructor (
    private modalService: NgbModal,
    private globalService: GlobalService,
  ) { }

  open( name: string, itemType: string, actionType: string, itemInfo?: any, date?: SeparatedDate ) {
    const modalRef = this.modalService.open( Modals[ name ] );
    switch ( name ) {
      case 'createEditModal': this.setEditCreateModalProps( modalRef, itemType, actionType, itemInfo, date );
        break;
      case 'confirmModal': this.setConfirmModalProps( modalRef, itemType, itemInfo );
        break;
      case 'createEditIdeaModal': this.setEditCreateIdeaModalProps( modalRef, actionType, itemType, itemInfo );
        break;
      case 'uploadModal': {
        modalRef.componentInstance.isImages = ( itemType == 'images' );
        modalRef.componentInstance.userId = itemInfo;
      }
        break;
      case 'commentModal': {
        modalRef.componentInstance.itemId = itemInfo.id;
        modalRef.componentInstance.itemStatus = itemInfo.status;
        modalRef.componentInstance.actionType = actionType; modalRef.componentInstance.itemType = itemType;
      }
        break;
      //('openProfileModal', 'userProfile', 'edit', 'userInfo')
      case 'profileModal': {
        modalRef.componentInstance.user = itemInfo;
        modalRef.componentInstance.actionType = actionType; modalRef.componentInstance.itemType = itemType;
      }
        break;

      default:
        break;
    }
    // if ( name === 'createEditModal' ) {
    //   this.setEditCreateModalProps( modalRef, itemType, actionType, itemInfo, date );
    // } else if ( name === 'confirmModal' ) {
    //   this.setConfirmModalProps( modalRef, itemType, itemInfo );
    // } else if ( name === 'createEditIdeaModal' ) {
    //   this.setEditCreateIdeaModalProps( modalRef, actionType, itemType, itemInfo );
    // } else if ( name === 'uploadModal' ) {
    //   modalRef.componentInstance.isImages = ( itemType == 'images' );
    //   modalRef.componentInstance.userId = itemInfo;
    // }




    // modalRef.result.then( ( result ) => {
    //   //this.closeResult = `Closed with: ${result}`;
    // }, ( reason ) => {
    //   //this.closeResult = `Dismissed ${this.getDismissReason( reason )}`;
    // } );
  }

  // private getDismissReason( reason: any ): string {
  //   if ( reason === ModalDismissReasons.ESC ) {
  //     return 'by pressing ESC';
  //   } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  openFromTemplate( templateName ) {
    return this.modalService.open( templateName );
  }

  private setEditCreateModalProps( modalRef: NgbModalRef, itemType: string, actionType: string, itemInfo?: any, date?: SeparatedDate
  ) {
    if ( actionType === 'create' ) {
      let item = {
        title: '',
        until_date: {
          day: null,
          month: null,
          year: null
        },
        description: ''
      }
      if ( itemType === 'action' ) {
        item[ 'goal_id' ] = itemInfo;
        modalRef.componentInstance.maxDate = date;
      } else if ( itemType === 'goal' && itemInfo ) {
        item.title = itemInfo.name ? itemInfo.name : '';
        item.description = ( itemInfo.info && itemInfo.info.content ) ? itemInfo.info.content : '';
        item.until_date = itemInfo.until_date ? itemInfo.until_date : item.until_date;
        modalRef.componentInstance.isAllowChooseCategory = true;
        modalRef.componentInstance.categories = this.globalService.getAppCategories();
      }

      modalRef.componentInstance.item = item;
    } else if ( actionType === 'edit' ) {
      if ( itemType === 'action' ) {
        modalRef.componentInstance.maxDate = date;
      }
      modalRef.componentInstance.item = itemInfo;
    }
    modalRef.componentInstance.actionType = actionType; modalRef.componentInstance.itemType = itemType;
  }
  private setEditCreateIdeaModalProps( modalRef: NgbModalRef, actionType: string, itemType: string, itemInfo?: any ) {
    if ( actionType === 'create' ) {
      let item = {
        name: '',
        info: {
          content: "",
          files: [],
          images: [],
        }
      }
      modalRef.componentInstance.item = item;
    } else if ( actionType === 'edit' ) {
      modalRef.componentInstance.item = itemInfo;
    }
    modalRef.componentInstance.actionType = actionType;
    modalRef.componentInstance.itemType = itemType;
  }

  private setConfirmModalProps( modalRef: NgbModalRef, itemType: string, itemInfo?: any ) {
    modalRef.componentInstance.itemType = itemType;
    if ( itemType === 'file' || itemType === 'image' ) {
      modalRef.componentInstance.title = itemInfo.name;
      modalRef.componentInstance.itemId = itemInfo.path;
    } else {
      modalRef.componentInstance.title = itemInfo.title ? itemInfo.title : itemInfo.name;
      modalRef.componentInstance.itemId = itemInfo.id;
    }
  }
}
