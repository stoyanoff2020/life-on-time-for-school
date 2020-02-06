import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoalService } from 'app/shared/services/goal.service';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component( {
  selector: 'app-all-goals-page',
  templateUrl: './all-goals-page.component.html',
  styleUrls: [ './all-goals-page.component.scss' ]
} )
export class AllGoalsPageComponent implements OnInit {
  @ViewChild( 'allGoals', { static: false } ) allGoals: ElementRef
  public goals$: Observable<Array<any>>;

  constructor (
    private goalService: GoalService,
  ) { }

  ngOnInit() {
    this.goals$ = this.goalService.getAllUserGoals();
  }

  downloadAsPDF() {
    html2canvas( this.allGoals.nativeElement ).then( canvas => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL( "image/png" );
      const imgProps = pdf.getImageProperties( img );
      const pdfWidth = pdf.internal.pageSize.getWidth() * 0.83;
      const pdfHeight = imgProps.height / 4 > pdf.internal.pageSize.getHeight() * 0.9 ? pdf.internal.pageSize.getHeight() * 0.9 : imgProps.height / 4;
      const margins = {
        top: 20,
        left: 20,
      };
      pdf.addImage( img, 'PNG', margins.left, margins.top, pdfWidth, pdfHeight );
      pdf.save( 'goals.pdf' );
    } )
  }
}
