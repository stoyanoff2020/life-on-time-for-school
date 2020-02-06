import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost, MediaType } from '../models/blogPost';
import { map } from 'rxjs/operators';
import { environment } from "environments/environment";

import { WellbeingInfo } from '../../shared/models/wellbeingInfo';

//'https://lotweb.cweb.bg/wp-json/wp/v2/'
const BASE_URL = environment.wp_url;
const WP_API_URL = BASE_URL + 'wp-json/wp/v2/';

const LAST_4_POSTS_END_URL = 'posts?per_page=4';
const MEDIA_END_URL = 'media/';
const WELLBEING_END_URL = 'wellbeing?per_page=100';
const HELP_END_URL = 'app_help?per_page=100';

@Injectable( {
  providedIn: 'root'
} )
export class PostService {

  constructor (
    private http: HttpClient
  ) { }

  getLats4Posts(): Observable<Array<BlogPost>> {
    return this.http.get<Array<BlogPost>>( WP_API_URL + LAST_4_POSTS_END_URL )
      .pipe(
        map( posts => {
          return posts.map( post => {
            return this.GetImagePostsDataFromAPI( post );
          } )
        } )
      );
  }
  getPostMedia( mediaId: string ): Observable<string> {
    return this.http.get( WP_API_URL + MEDIA_END_URL + mediaId )
      .pipe(
        map( media => media[ 'guid' ][ 'rendered' ] )
      )
  }

  getHelpPosts(): Observable<Array<BlogPost>> {
    return this.http.get<Array<BlogPost>>( WP_API_URL + HELP_END_URL )
      .pipe(
        map( posts => {
          return posts.map( post => {
            return this.GetImagePostsDataFromAPI( post );
          } );
        } )
      )
  }

  getWellbeingPostByCAtegoryAndAppType( appWPId: string, wellbeingCategory: string ): Observable<Array<BlogPost>> {
    const options = {
      params: {
        wellbeing_apps: appWPId,
        wellbeing_categories: WellbeingInfo.categoryId[ wellbeingCategory ],
      }
    }
    return this.http
      .get<Array<BlogPost>>( WP_API_URL + WELLBEING_END_URL, options )
      .pipe(
        map( posts => {
          return posts.map( post => {
            return this.getAllKindsPostDataFromAPI( post );
          } )
        } )
      )
  }

  private GetImagePostsDataFromAPI( post ): BlogPost {
    const postDate = ( post[ 'date' ].split( 'T' ) )[ 0 ].split( '-' );
    const blogPost: BlogPost = {
      id: post[ 'id' ],
      date: `${postDate[ 2 ]}/${postDate[ 1 ]}/${postDate[ 0 ]}`,
      title: post[ 'title' ][ 'rendered' ],
      imageUrl: '',
      mediaType: MediaType.image,
      mediaId: post[ 'featured_media' ],
      shortContent: post[ 'content' ][ 'rendered' ].length > 200 ? `${post[ 'content' ][ 'rendered' ].substring( 0, 200 )} ...` : `${post[ 'content' ][ 'rendered' ]}`,
      content: post[ 'content' ][ 'rendered' ],
      link: post[ 'link' ],
    };
    return blogPost;
  }

  private getAllKindsPostDataFromAPI( post ): BlogPost {
    const postDate = ( post[ 'date' ].split( 'T' ) )[ 0 ].split( '-' );
    //contentTypeId: {
    // video: 14,
    //   publication: 19,
    //     audio: 20,
    //}
    const mediaType = this.setMediaType( post[ 'wellbeing_type' ][ 0 ] );
    const blogPost: BlogPost = {
      id: post[ 'id' ],
      date: `${postDate[ 2 ]}/${postDate[ 1 ]}/${postDate[ 0 ]}`,
      mediaType: mediaType,
      title: post[ 'title' ][ 'rendered' ],
      content: post[ 'content' ][ 'rendered' ],
      link: post[ 'link' ],
    };

    if ( mediaType === MediaType.image ) {
      blogPost.mediaId = post[ 'featured_media' ];
      blogPost.shortContent = post[ 'content' ][ 'rendered' ].length > 200 ? `${post[ 'content' ][ 'rendered' ].substring( 0, 200 )} ...` : `${post[ 'content' ][ 'rendered' ]}`
    }
    return blogPost;
  }

  private setMediaType( mediaTypeId: number ): MediaType {
    switch ( mediaTypeId ) {
      case 14: return MediaType.video;
      case 19: return MediaType.image;
      case 20: return MediaType.audio;
      default: return MediaType.image;
    }
  }

}
