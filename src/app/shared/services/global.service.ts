import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { AppType } from '../models/appType';

@Injectable( {
  providedIn: 'root'
} )

export class GlobalService {
  appTypeInfo: AppType;
  categories: Array<Category>;

  constructor () {
  }
  public setChoosenAppTypeInfo( appTypeInfo: AppType ): void {
    this.appTypeInfo = appTypeInfo;
  }

  public getChoosenAppTypeInfo(): AppType {
    return this.appTypeInfo;
  }

  public setAppCategories( categories: Array<Category> ): void {
    this.categories = categories;
  }

  public getAppCategories(): Array<Category> {
    return this.categories;
  }

}
