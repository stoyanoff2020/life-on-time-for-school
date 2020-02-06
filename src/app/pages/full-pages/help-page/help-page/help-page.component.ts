import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'app/shared/services/post.service';
import { BlogPost } from 'app/shared/models/blogPost';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: [ './help-page.component.scss' ]
} )
export class HelpPageComponent implements OnInit, OnDestroy {


  posts: Array<BlogPost>;

  private postSubs: Subscription;
  private postMediaSubs: Subscription;

  constructor (
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postSubs =
      this.postService.getHelpPosts()
        .subscribe( posts => {
          for ( const post of posts ) {
            if ( post.mediaId > '0' ) {
              this.postMediaSubs = this.postService.getPostMedia( post.mediaId )
                .subscribe( imageUrl => {
                  post.imageUrl = imageUrl;
                } )
            }
          }
          this.posts = posts;
        } );
  }

  ngOnDestroy(): void {
    if ( this.postSubs ) {
      this.postSubs.unsubscribe();
    }
    if ( this.postMediaSubs ) {
      this.postMediaSubs.unsubscribe();
    }
  }

}
