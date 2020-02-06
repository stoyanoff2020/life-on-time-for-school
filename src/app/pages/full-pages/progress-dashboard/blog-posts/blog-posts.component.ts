import { Component, Input } from '@angular/core';
import { BlogPost } from 'app/shared/models/blogPost';

@Component( {
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: [ './blog-posts.component.scss' ]
} )

export class BlogPostsComponent {
  @Input( 'posts' ) posts: Array<BlogPost>;
  // posts: Array<BlogPost> = [
  //   {
  //     title: 'First Post',
  //     text: 'Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly.',
  //     image: 'assets/img/photos/06.jpg',
  //     link: ''
  //   },
  //   {
  //     title: 'Second Post',
  //     text: 'Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly.',
  //     image: 'assets/img/photos/06.jpg',
  //     link: ''
  //   },
  //   {
  //     title: 'Third Post',
  //     text: 'Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly.',
  //     image: 'assets/img/photos/06.jpg',
  //     link: ''
  //   },
  //   {
  //     title: 'Fourth Post',
  //     text: 'Icing powder caramels macaroon. Toffee sugar plum brownie pastry gummies jelly.',
  //     image: 'assets/img/photos/06.jpg',
  //     link: ''
  //   }
  // ];

  // constructor () { }

  // ngOnInit() {
  // }

}
