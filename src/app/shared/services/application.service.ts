import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment'
import { map } from 'rxjs/operators';
import { AppType } from '../models/appType';

const BASE_URL = environment.apiUrl + 'applicationtypes';

@Injectable( {
  providedIn: 'root'
} )

export class ApplicationService {

  constructor (
    private http: HttpClient
  ) { }

  getAplicationTypes(): Observable<AppType[]> {
    return this.http.get<AppType[]>( BASE_URL )
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
}
