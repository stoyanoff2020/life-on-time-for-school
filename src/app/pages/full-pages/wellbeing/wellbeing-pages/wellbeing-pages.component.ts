import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'app/shared/services/user.service';
import { BlogPost, MediaType } from 'app/shared/models/blogPost';
import { PostService } from 'app/shared/services/post.service';
import { ApplicationService } from 'app/shared/services/application.service';

@Component( {
  selector: 'app-wellbeing-pages',
  templateUrl: './wellbeing-pages.component.html',
  styleUrls: [ './wellbeing-pages.component.scss' ]
} )
export class WellbeingPagesComponent implements OnInit, OnDestroy {

  path: string;
  title: string;
  appType: string;
  posts: Array<BlogPost>;

  private appTypeSubs: Subscription;
  private postSubs: Subscription;
  private postMediaSubs: Subscription;
  private appSubs: Subscription;

  constructor (
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private appService: ApplicationService
  ) { }

  ngOnInit() {
    this.path = this.route.snapshot.url[ 0 ].path;
    this.title = this.path.split( '-' )[ 0 ];
    this.appTypeSubs =
      this.userService
        .getUserAppTypeId()
        .subscribe( ( userAppTypeId ) => {
          this.appSubs = this.appService
            .getAplicationTypes()
            .subscribe( appTypes => {
              const userAppTypeWPId = appTypes.find( at => at.id == Number( userAppTypeId ) ).wpCategoryId;
              this.postSubs =
                this.postService
                  .getWellbeingPostByCAtegoryAndAppType( String( userAppTypeWPId ), this.path )
                  .subscribe( posts => {
                    posts.map( post => {
                      if ( MediaType[ post.mediaType ] === 'image'
                        && post.mediaId != '0' ) {
                        this.postMediaSubs =
                          this.postService
                            .getPostMedia( post.mediaId )
                            .subscribe( media => {
                              post.imageUrl = media;
                            } )
                      }
                    } )
                    this.posts = posts;
                  } )
            } )

        } )
  }

  ngOnDestroy(): void {
    if ( this.appTypeSubs ) {
      this.appTypeSubs.unsubscribe();
    }
    if ( this.postSubs ) {
      this.postSubs.unsubscribe();
    }
    if ( this.postMediaSubs ) {
      this.postMediaSubs.unsubscribe();
    }
    if ( this.appSubs ) {
      this.appSubs.unsubscribe();
    }
  }


}
