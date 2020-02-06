import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "environments/environment";
import { Idea, IdeaFile } from '../models/idea';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

const BASE_URL = environment.apiUrl + 'ideas';
const USER_IDEAS_URL = environment.apiUrl + 'me/ideas';
const USER_IDEAS_FILES_END = '/file/';
const UPLOAD_FILE_URL = environment.fileUplodeUrl;

@Injectable( {
  providedIn: 'root'
} )
export class IdeaService {
  userId: string;

  constructor (
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserIdFromToken( 'token' );
  }

  getUserIdeas(): Observable<Array<Idea>> {
    return this.http.get<Array<Idea>>( USER_IDEAS_URL )
      .pipe(
        map( data => {
          const ideas = data[ 'data' ][ 'ideas' ];
          if ( ideas instanceof Object ) {
            const ideaValue = Object.keys( ideas ).map( key => ideas[ key ] );
            return ideaValue.map( idea => {
              const ideaCreatedDateArray =
                ( idea[ 'created_at' ].split( ' ' )[ 0 ] ).split( '-' );
              const dd = ideaCreatedDateArray[ 2 ];
              const mm = ideaCreatedDateArray[ 1 ];
              const yyyy = ideaCreatedDateArray[ 0 ];
              idea[ 'created_at' ] = `${dd}/${mm}/${yyyy}`;
              idea[ 'created_at' ] = `${dd}/${mm}/${yyyy}`;
              return idea;
            } )
          } else {
            return ideas.map( idea => {
              const ideaCreatedDateArray =
                ( idea[ 'created_at' ].split( ' ' )[ 0 ] ).split( '-' );
              const dd = ideaCreatedDateArray[ 2 ];
              const mm = ideaCreatedDateArray[ 1 ];
              const yyyy = ideaCreatedDateArray[ 0 ];
              idea[ 'created_at' ] = `${dd}/${mm}/${yyyy}`;
              return idea;
            } )
          }
        }
        ) );
  }

  getUserIdeasAsNumber(): Observable<Number> {
    return this.http.get<Number>( USER_IDEAS_URL )
      .pipe(
        map( ideas => {
          return ideas[ 'dataValue' ].ideasNumber
        } )
      );
  }

  getIdeaById( id: string ): Observable<Idea> {
    return this.http.get<Idea>( BASE_URL + `/${id}` );
  }

  putEditIdeaById( id: string, idea: Idea ) {
    return this.http.put( BASE_URL + `/${id}`, idea );
  }

  deletIdeaById( id: string ) {
    return this.http.delete( BASE_URL + `/${id}` );
  }

  postCreateIdea( idea: Idea ) {
    return this.http.post( BASE_URL, idea );
  }

  postDeleteFileFromFolder( formData ) {
    return this.http.post( UPLOAD_FILE_URL, formData );
  }

  deleteFileFromIdea( ideaId, fileName: string ) {
    const options = {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json',
      } ),
      body: {
        path: fileName,
      },
    }
    return this.http.delete( BASE_URL + USER_IDEAS_FILES_END + ideaId, options )
  }

  putAddFileToIdea( ideaId, file: IdeaFile ) {
    return this.http.put( BASE_URL + USER_IDEAS_FILES_END + ideaId, file );
  }
}
