import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { CookieService } from 'ngx-cookie-service';
import { RegisterUser } from '../models/registerUser';
import { LoginUser } from '../models/loginUser';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

const BASE_URL = environment.apiUrl + 'auth/';
const GOOGLE_CALENDAR_URL = environment.google_calendar__url;
const GOOGLE_LANDING_END_URL = 'google-landing.php';
const GOOGLE_SYNC_END_URL = 'test.php';
const LOGIN_END_URL = 'login';
const REGISTER_END_URL = 'register';
const LOGOUT_END_URL = 'logout';

@Injectable()
export class AuthService {

  constructor (
    private http: HttpClient,
    //private cookieService: CookieService
  ) { }

  registerUser( body: RegisterUser ) {
    return this.http.post( BASE_URL + REGISTER_END_URL, body )
  }

  loginUser( body: LoginUser ) {
    return this.http.post( BASE_URL + LOGIN_END_URL, body )
    // { observe: 'response' }
  }

  getUsers() {
    return this.http.get( 'me' );
  }

  logout() {
    return this.http.get( BASE_URL + LOGOUT_END_URL )
  }

  getTokenPayload( tokenName: string ) {
    const token = this.getToken( 'token' );
    return helper.decodeToken( token );
  }

  getUserIdFromToken( tokenName: string ) {
    return this.getTokenPayload( 'token' )[ 'sub' ];
  }

  getTokenExp( token ) {
    return helper.getTokenExpirationDate( token );
  }

  // isTokenExpired( token ) {
  //   return helper.isTokenExpired( token );
  // }

  getToken( tokenName: string ) {
    return localStorage.getItem( tokenName );
  }

  setToken( token ) {
    localStorage.setItem( 'token', token );
  }

  deleteToken( name: string ) {
    localStorage.removeItem( name );
  }

  isAuthenticated() {
    let token: string = this.getToken( 'token' );
    let isExpired: boolean = helper.isTokenExpired( token );
    return ( this.getToken( 'token' ) !== null && !isExpired );
    //
  }

  postIsUserLogedInToGoodleCalendar() {
    return this.http.post( GOOGLE_CALENDAR_URL + GOOGLE_LANDING_END_URL, { 'token': this.getToken( 'token' ) } );
  }

  getLogInToGoodleCalendar() {
    return this.http.get( GOOGLE_CALENDAR_URL + GOOGLE_SYNC_END_URL );
  }

  // setTokenInCookie( expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: "Lax" | "Strict" ): void {
  //   this.cookieService.set( 'token', this.getToken( 'token' ) );
  // }

  // deleteTokenCookie() {
  //   this.cookieService.delete( 'token' );
  // }

  //logic only with token

  //---------------------logic with token  saved in cookie start-------------------

  // setCookie( name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean, sameSite?: "Lax" | "Strict" ): void {
  //   this.cookieService.set( name, value, expires, path, domain, secure, sameSite );
  // }

  // getCookie() {
  //   return this.cookieService.get( 'token' );
  // }

  // deleteCookie( name: string ) {
  //   this.cookieService.delete( name );
  // }

  // isAuthenticated() {
  //   let cookie = this.cookieService.get( 'token' );
  //   return this.cookieService.get( 'token' ) !== '';
  //   //localStorage.getItem( 'isAuthenticated' ) !== null;
  // }
  //-----------------------logic with token  saved in cookie ends--------------

}
