import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, debounce } from 'rxjs/operators';

import { environment } from "environments/environment";
import { Goal, GoalForComplete } from '../models/goal';
import { GoalCreate } from '../models/goalCreate';
import { BarChartData } from '../models/barChartData';
import { GlobalService } from "./global.service";

const BASE_URL = environment.apiUrl + "me/goals";
const BASE_CRUD_URL = environment.apiUrl + "goals";
const USER_COMPLETED_GOALS_END = "/completed";
const USER_RATE_END = "/rate";
const USER_GOALS_FROM_IDEAS_END = "/fromideas";
const USER_LAST_THREE_GOALS_END = "/lastthree";
const USER_GOALS_END = "/bycategoryall";
const USER_GOALS_TASKS_END = "/bycategory";

@Injectable( {
  providedIn: 'root'
} )
export class GoalService {

  constructor (
    private http: HttpClient,
    private globalService: GlobalService,
  ) {
  }

  getUserGoalsNumber(): Observable<Number> {
    return this.http.get<Array<Goal>>( BASE_URL )
      .pipe(
        map( goals => goals[ 'dataValue' ].goalsNumber )
      );
  }

  getAllUserGoals(): Observable<any> {
    return this.http.get<Array<any>>( BASE_URL )
      .pipe(
        map( goals => {
          return goals[ 'dataValue' ].goals.map( goal => {
            if ( goal.until_date ) {
              const goalLeftDays = Math.round( ( Date.now() - +( new Date( goal.until_date ) ) ) / ( 60 * 60 * 24 * 1000 ) );

              goal.goalLeftDays = goalLeftDays;

              const goalDueDateAsString = goal.until_date.split( '-' );
              goal.until_date = {
                day: Number( goalDueDateAsString[ 2 ] ),
                month: Number( goalDueDateAsString[ 1 ] ),
                year: Number( goalDueDateAsString[ 0 ] )
              };
            }

            if ( goal.created_at ) {
              const goalCreatedDateAsString = ( goal.created_at.split( ' ' ) )[ 0 ].split( '-' );
              goal.created_at = {
                day: Number( goalCreatedDateAsString[ 2 ] ),
                month: Number( goalCreatedDateAsString[ 1 ] ),
                year: Number( goalCreatedDateAsString[ 0 ] )
              };
            }
            return {
              title: goal.title,
              until_date: goal.until_date,
              created_at: goal.created_at,
              category: goal.category,
              goalLeftDays: goal.goalLeftDays,
              status: goal.status
            }
          } )
        } )
      )
  }

  getGoalsByCategory( category: string ) {
    return this.http.get( BASE_URL + USER_GOALS_END )
      .pipe(
        map( data => {
          if ( data[ 'dataValue' ][ category ] ) {
            const completedGoals = [];
            const upcomingGoals = [];
            data[ 'dataValue' ][ category ][ 'goals' ].map( goal => {
              const goalLeftDays = Math.round( ( Date.now() - +( new Date( goal.until_date ) ) ) / ( 60 * 60 * 24 * 1000 ) );

              goal.goalLeftDays = goalLeftDays;
              if ( goal.until_date ) {
                const goalDueDateAsString = goal.until_date.split( '-' );
                goal.until_date = {
                  day: Number( goalDueDateAsString[ 2 ] ),
                  month: Number( goalDueDateAsString[ 1 ] ),
                  year: Number( goalDueDateAsString[ 0 ] )
                };
              }

              if ( goal.created_at ) {
                const goalCreatedDateAsString = ( goal.created_at.split( ' ' ) )[ 0 ].split( '-' );
                goal.created_at = {
                  day: Number( goalCreatedDateAsString[ 2 ] ),
                  month: Number( goalCreatedDateAsString[ 1 ] ),
                  year: Number( goalCreatedDateAsString[ 0 ] )
                };
              }

              goal.tasks.map( task => {
                const taskLeftDays = Math.round( ( Date.now() - +( new Date( task.until_date ) ) ) / ( 60 * 60 * 24 * 1000 ) );
                task.taskLeftDays = taskLeftDays;
                const taskDueDateAsString = task.until_date.split( '-' );
                task.until_date = {
                  day: Number( taskDueDateAsString[ 2 ] ),
                  month: Number( taskDueDateAsString[ 1 ] ),
                  year: Number( taskDueDateAsString[ 0 ] )
                }
                return task;
              } )
              if ( goal.status == '1' ) {
                completedGoals.push( goal );
              } else {
                upcomingGoals.push( goal );
              }
            } )
            return { completedGoals, upcomingGoals: upcomingGoals }
          } else {
            return { completedGoals: [], upcomingGoals: [] };
          }
        } )
      );
  }

  getUserLastThreeGoalsStatistic(): Observable<Array<any>> {
    return this.http.get<Array<any>>( BASE_URL + USER_LAST_THREE_GOALS_END )
      .pipe(
        map( goals => {
          const goalsObj = goals[ 'data' ];
          const goalsArray = Object.keys( goalsObj ).map( key => goalsObj[ key ] );
          return goalsArray
            .map( g => {
              const goal = {
                goal: g.name,
                series: [
                  {
                    name: "Overdue",
                    className: "ct-overdue",
                    value: g.overdue
                  },
                  {
                    name: "Upcoming",
                    className: "ct-upcoming",
                    value: g.upcoming
                  },
                  {
                    name: "Set",
                    className: "ct-set",
                    value: g.set
                  },
                  {
                    name: "Done",
                    className: "ct-done",
                    value: g.done
                  }
                ]
              }
              return goal;
            } )
        } )
      )
  }

  getUserCompletedGoals(): Observable<Number> {
    return this.http.get<Number>( BASE_URL + USER_COMPLETED_GOALS_END )
      .pipe(
        map( goals => goals[ 'dataValue' ].number )
      );
  }

  getUserGoalsFromIdeas(): Observable<Number> {
    return this.http.get<Number>( BASE_URL + USER_GOALS_FROM_IDEAS_END )
      .pipe(
        map( goals => goals[ 'dataValue' ].number )
      );
  }

  getUserRate(): Observable<Number> {
    return this.http.get<Number>( BASE_URL + USER_RATE_END )
      .pipe(
        map( rate => rate[ 'dataValue' ].percent )
      );
  }

  getUserGoalsAndTasksByCategoryAsNumber(): Observable<BarChartData> {
    return this.http.get<BarChartData>( BASE_URL + USER_GOALS_TASKS_END )
      .pipe(
        map( data => {

          const barData = data[ 'dataValue' ]
          const barChart = {
            labels: this.globalService.getAppCategories() ? this.globalService.getAppCategories().map( c => c.title ) : [],
            series: [ {
              "name": "Goals",
              "value": []
            }, {
              "name": "Actions",
              "value": []
            } ]
          };
          barChart.labels.forEach( label => {
            barChart.series[ 0 ].value.push( barData[ label ] ? barData[ label ].goals : 0 );
            barChart.series[ 1 ].value.push( barData[ label ] ? barData[ label ].tasks : 0 );
          } );
          return barChart;
        } )
      );
  }

  postCreateGoal( goal: GoalCreate ): Observable<Goal> {
    return this.http.post<Goal>( BASE_CRUD_URL, goal );
  }

  getGoalInfoForStatus( id: string ): Observable<GoalForComplete> {
    return this.http.get<GoalForComplete>( BASE_CRUD_URL + `/${id}` )
      .pipe(
        map( data => {
          return {
            isTasksCompleted: data[ 'data' ].tasks.find( t => t.status == '0' ) === undefined,
            status: data[ 'data' ][ 'status' ]
          }
        } )
      );
  }

  putEditGoalById( id: string, goal: GoalCreate ): Observable<Goal> {
    return this.http.put<Goal>( `${BASE_CRUD_URL}/${id}`, goal );
  }

  deleteGoalById( id: string ) {
    return this.http.delete( BASE_CRUD_URL + `/${id}` );
  }
}
