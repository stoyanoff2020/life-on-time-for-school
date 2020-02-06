import { Component, OnInit, Input } from '@angular/core';

@Component( {
  selector: 'app-single-all-goals-card',
  templateUrl: './single-all-goals-card.component.html',
  styleUrls: [ './single-all-goals-card.component.scss' ]
} )
export class SingleAllGoalsCardComponent implements OnInit {
  @Input() goal;

  constructor () { }

  ngOnInit() {
  }

}
