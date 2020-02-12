import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { AppType } from '../models/appType';
import { AppSettings } from '../models/appSettings';

const BASE_URL = environment.apiUrl;
const APP_TYPES_END = 'applicationtypes';
const APP_SETTINGS_END = 'settings';

@Injectable( {
  providedIn: 'root'
} )

export class ApplicationService {

  constructor (
    private http: HttpClient
  ) { }

  getAplicationTypes(): Observable<AppType[]> {
    return this.http.get<AppType[]>( BASE_URL + APP_TYPES_END )
      .pipe(
        map( data => {
          return data[ 'data' ].map( type => {
            return {
              id: type.id,
              name: type.name,
              description: type.description,
              duration: type.duration,
              logo: `assets/img/logos/${type.logo}`,
              is_active: type.is_active,
              wpCategoryId: type.wp_cat_id,
              price: type.price
            }
          } )
        } )
      );
  }

  getAppSettings(): Observable<AppSettings> {
    return this.http
      .get<AppSettings>( BASE_URL + APP_SETTINGS_END )
      .pipe(
        map( data => {
          return {
            schoolName: data[ 'data' ][ 'school_name' ],
            schoolLogo: data[ 'data' ][ 'school_logo' ],
            startColor: data[ 'data' ][ 'color1' ],
            endColor: data[ 'data' ][ 'color2' ],
          }
        } )
      );
  }
}
