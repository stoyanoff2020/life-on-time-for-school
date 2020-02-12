import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { AppType } from '../models/appType';
import { AppSettings } from '../models/appSettings';

@Injectable( {
  providedIn: 'root'
} )

export class GlobalService {
  appTypeInfo: AppType;
  categories: Array<Category>;
  appSettings: AppSettings;
  userClass: string;

  constructor () {
  }

  public setAppSettings( appSettings: AppSettings ) {
    this.appSettings = appSettings;
  }

  public getAppSettings() {
    return this.appSettings;
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

  public setUserClass( userClass: string ): void {
    this.userClass = userClass;
  }

  public getUserClass(): string {
    return this.userClass;
  }

}
