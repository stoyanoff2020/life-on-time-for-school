import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from 'app/shared/models/blogPost';

@Component( {
  selector: 'app-card-audio',
  templateUrl: './card-audio.component.html',
  styleUrls: [ './card-audio.component.scss' ]
} )
export class CardAudioComponent implements OnInit {
  @Input( 'post' ) post: BlogPost;

  constructor () { }

  ngOnInit() {
  }

}
