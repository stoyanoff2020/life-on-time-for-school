import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { BlogPost } from 'app/shared/models/blogPost';

@Component( {
  selector: 'app-card-video',
  templateUrl: './card-video.component.html',
  styleUrls: [ './card-video.component.scss' ],
  encapsulation: ViewEncapsulation.None
} )
export class CardVideoComponent implements OnInit {
  @Input( 'post' ) post: BlogPost;

  constructor () { }

  ngOnInit() {
  }

}
