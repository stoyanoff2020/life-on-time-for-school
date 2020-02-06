import { Routes, RouterModule } from '@angular/router';

import { NonAuthGuard } from '../auth/non-auth-guard.service';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration, Forgot password etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: 'user',
    loadChildren: () => import( '../../pages/auth/auth.module' ).then( m => m.AuthModule ),
    canActivate: [ NonAuthGuard ]
  },
  {
    path: '',
    loadChildren: () => import( '../../pages/content-pages/content-pages.module' ).then( m => m.ContentPagesModule ),
  },
];
