import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "environments/environment";
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from "../models/category";
import { UserAppInfo } from '../models/userAppInfo';

const BASE_URL = environment.apiUrl + 'me';
const USER_GOALS_END = '/goals';
const USER_TASKS_END = '/tasks';
const CALENDAR_END = '/calendar';
const FULL_CALENDAR_END = '/fullcalendar';
// api / me / calendar -> Връща само масив от таскове и цели
// api / me / fullcalendar / -> Връща масива с всичките данни от - 5 до + 5 години
// year = 2019
// api / me / fullcalendar / { year } -> Връща масива с всичките данни само за 2019, или която си задала

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

@Injectable( {
  providedIn: 'root'
} )
export class UserService {

  constructor (
    private http: HttpClient
  ) { }

  getUserAppInfo(): Observable<UserAppInfo> {
    return this.http.get<UserAppInfo>( BASE_URL )
      .pipe(
        map( data => {
          console.log( data );
          const categoriesData = data[ 'data' ][ 'categories' ];
          const categories = [];
          Object.entries<string>( categoriesData ).forEach( ( [ id, title ] ) => {
            const category = {
              id,
              title,
              pathEnd: `${title.toLowerCase().split( ' ' ).join( '-' )}`
            }
            categories.push( category );
          } )
          const userInfo: UserAppInfo = {
            categories: categories,
            appType: data[ 'data' ][ 'applicationType' ][ 'name' ],
            maxGoals: data[ 'data' ][ 'maxGoals' ],
            maxTasks: data[ 'data' ][ 'maxTasks' ]
          }
          return userInfo;
        } )
      )
  }

  getUserRegistrationDate(): Observable<string> {
    return this.http.get( BASE_URL )
      .pipe(
        map( data => {
          const regDateAsArray = ( ( data[ 'data' ][ 'created_at' ] ).split( ' ' )[ 0 ] ).split( '-' );
          const year = regDateAsArray[ 0 ];
          const mm = regDateAsArray[ 1 ];
          const day = regDateAsArray[ 2 ];
          return `${day} ${months[ mm - 1 ]} ${year}`;
        } ) )
  }

  // getUserAvailableCategories(): Observable<Array<Category>> {
  //   return this.http.get<Array<Category>>( BASE_URL )
  //     .pipe(
  //       map( data => {
  //         const categoriesData = data[ 'data' ][ 'categories' ];
  //         const categories = [];
  //         Object.entries<string>( categoriesData ).forEach( ( [ id, title ] ) => {
  //           const category = {
  //             id,
  //             title,
  //             pathEnd: `${title.toLowerCase().split( ' ' ).join( '-' )}`
  //           }
  //           categories.push( category );
  //         } )
  //         return categories
  //       } )
  //     );
  // }

  getUserAvailableCategoriesObj(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>( BASE_URL )
      .pipe(
        map( data => {
          return data[ 'data' ][ 'categories_objects' ]
            .map( category => {
              category.title = category.name,
                category.pathEnd = `${category.name.toLowerCase().split( ' ' ).join( '-' )}`
              return category
            } );
        } )
      );
  }

  getUserAllowedNumbetGoalsAndTasks() {
    return this.http.get( BASE_URL )
      .pipe(
        map( data => {
          return {
            createdGoals: data[ 'createdGoals' ],
            createdTasks: data[ 'createdTasks' ],
            maxGoals: data[ 'maxGoals' ],
            maxTasks: data[ 'maxTasks' ],
          }
        } )
      )
  }

  getUserAppTypeId(): Observable<string> {
    return this.http.get<number>( BASE_URL )
      .pipe(
        map( data => data[ 'data' ][ 'applicationType' ][ 'id' ] )
      )
  }


  //this end point returns only uncompleted goals and tasks
  getTaskAndGoalsForCalendar() {
    return this.http.get( BASE_URL + CALENDAR_END )
      .pipe(
        map( data => {
          const items = [];
          data[ 'data' ][ 'tasks' ].forEach( task => {
            const taskLeftDays: Number = Math.round( ( Date.now() - +( new Date( task.until_date ) ) ) / ( 60 * 60 * 24 * 1000 ) );
            items.push( {
              title: task.status === 1 ? `<del>${task[ 'title' ]} </del>` : task[ 'title' ],
              date: task[ 'until_date' ],
              url: `values/${task[ 'category_name' ].split( ' ' ).map( w => w.toLowerCase() ).join( '-' )}#a-${task.id}`,
              backgroundColor: taskLeftDays > 0 ? '#FF6B64' : "#808955",
              borderColor: taskLeftDays > 0 ? '#FF6B64' : "#808955",
            } )
          } )
          data[ 'data' ][ 'goals' ].forEach( goal => {
            const goalLeftDays: Number = Math.round( ( Date.now() - +( new Date( goal.until_date ) ) ) / ( 60 * 60 * 24 * 1000 ) );
            items.push( {
              title: goal.status === 1 ? `<del>${goal[ 'title' ]}</del>` : goal[ 'title' ],
              date: goal[ 'until_date' ],
              url: `values/${goal[ 'category_name' ].split( ' ' ).map( w => w.toLowerCase() ).join( '-' )}#g-${goal.id}`,
              backgroundColor: goalLeftDays > 0 ? '#FF6B64' : "#808955",
              borderColor: goalLeftDays > 0 ? '#FF6B64' : "#808955",
              //textColor: "#009DA0",
            } )
          } )

          return items;
        } )
      )
  }

  //this end point returns uncompleted goals and tasks due date by years, months and days
  // getIdeasAndGoalsDueDateFullCAlendar() {
  //   return this.http.get( BASE_URL + FULL_CALENDAR_END )
  //     .pipe(
  //       map( data => {
  //         const items = [];
  //         const dataArray = Object.keys( data[ 'data' ] ).map( key => data[ 'data' ][ key ] );
  //         dataArray.map( year => {
  //           const yearsArray = Object.keys( year ).map( key => year[ key ] );
  //           yearsArray
  //             .filter( m => !( m instanceof Array ) )
  //             .map( m => {
  //               const monthArray = Object.keys( m ).map( key => m[ key ] );
  //               monthArray.map( day => {
  //                 if ( day[ 'tasks' ] ) {
  //                   day[ 'tasks' ].forEach( task => {
  //                     items.push( {
  //                       title: task[ 'title' ],
  //                       date: task[ 'until_date' ],
  //                       url: `goals/${task[ 'category_name' ].split( ' ' ).map( w => w.toLowerCase() ).join( '-' )}`,
  //                       backgroundColor: "#009DA0",
  //                       borderColor: "#009DA0",
  //                       //textColor: "#FF8D60",
  //                     } )
  //                   } )
  //                 }
  //                 if ( day[ 'goals' ] ) {
  //                   day[ 'goals' ].forEach( goal => {
  //                     items.push( {
  //                       title: goal[ 'title' ],
  //                       date: goal[ 'until_date' ],
  //                       url: `goals/${goal[ 'category_name' ].split( ' ' ).map( w => w.toLowerCase() ).join( '-' )}`,
  //                       backgroundColor: "#FF8D60",
  //                       borderColor: "#FF8D60",
  //                       //textColor: "#009DA0",
  //                     } )
  //                   } )
  //                 }
  //                 day;
  //               } );
  //             } )
  //         } )
  //         return items;
  //       } )
  //     )
  // }
}
