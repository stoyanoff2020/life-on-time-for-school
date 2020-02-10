import { Component, OnInit, OnDestroy } from '@angular/core';
import { forkJoin, Subscription, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import dayGridPlugin from '@fullcalendar/daygrid';

import { minStatisticData } from '../../../../shared/data/minStatisticFirstRowData';
import { GoalService } from "../../../../shared/services/goal.service";
import { TaskService } from "../../../../shared/services/task.service";
import { IdeaService } from 'app/shared/services/idea.service';

import { UserService } from 'app/shared/services/user.service';
import { BarChartData } from 'app/shared/models/barChartData';

@Component( {
  selector: 'app-progress-dashboard',
  templateUrl: './progress-dashboard.component.html',
  styleUrls: [ './progress-dashboard.component.scss' ]
} )
export class ProgressDashboardComponent implements OnInit, OnDestroy {
  calendarPlugins = [ dayGridPlugin ]; // important!

  registrationDate: string;
  donutCharts$: Observable<Array<any>>;
  barChart$: Observable<BarChartData>;
  minStaticsDataFirstRow = minStatisticData.firstRow;
  minStaticsDataSecondRow = minStatisticData.secondRow;
  calendarEvents: any;
  isChartsCollapsed: boolean = true;
  private minStatSubscription: Subscription;
  private regDateSubscripton: Subscription;
  private PostsSubscripton: Subscription;
  private singlePostSub: Subscription;
  private calendarSubs: Subscription;

  constructor (
    private taskService: TaskService,
    private goalService: GoalService,
    private ideasService: IdeaService,
    private userServise: UserService,
  ) {
  }

  ngOnInit() {
    this.userServise.getUserRegistrationDate()
      .subscribe( date => this.registrationDate = date );
    this.minStatSubscription = forkJoin(
      //first row
      this.goalService.getUserGoalsNumber().pipe( catchError( error => of( error ) ) ),
      this.taskService.getUserAllTasksAsNumber().pipe( catchError( error => of( error ) ) ),
      this.ideasService.getUserIdeasAsNumber().pipe( catchError( error => of( error ) ) ),
      this.taskService.getDaysToCompleteTasks().pipe( catchError( error => of( error ) ) ),
      //second row
      this.goalService.getUserCompletedGoals().pipe( catchError( error => of( error ) ) ),
      this.taskService.getUserCompletedTasks().pipe( catchError( error => of( error ) ) ),
      this.goalService.getUserGoalsFromIdeas().pipe( catchError( error => of( error ) ) ),
      this.goalService.getUserRate().pipe( catchError( error => of( error ) ) ),
    )
      .subscribe( ( [ goals, tasks, ideas, daysTocompleteTasks,
        completedGoals, completedTasks, ideasToGoals, rate
      ] ) => {
        this.minStaticsDataFirstRow[ 0 ].value = goals;
        this.minStaticsDataFirstRow[ 0 ].registrationDate = this.registrationDate;
        this.minStaticsDataFirstRow[ 1 ].value = tasks;
        this.minStaticsDataFirstRow[ 1 ].registrationDate = this.registrationDate;
        this.minStaticsDataFirstRow[ 2 ].value = ideas;
        this.minStaticsDataFirstRow[ 2 ].registrationDate = this.registrationDate;
        this.minStaticsDataFirstRow[ 3 ].value = daysTocompleteTasks;
        this.minStaticsDataSecondRow[ 0 ].value = completedGoals;
        this.minStaticsDataSecondRow[ 1 ].value = completedTasks;
        this.minStaticsDataSecondRow[ 2 ].value = ideasToGoals;
        this.minStaticsDataSecondRow[ 3 ].value = rate + ' %';
      } );

    //this.donutCharts$ = this.goalService.getUserLastThreeGoalsStatistic();
    this.barChart$ = this.goalService.getUserGoalsAndTasksByCategoryAsNumber();

    this.calendarSubs =
      this.userServise.getTaskAndGoalsForCalendar()
        .subscribe( data => {
          this.calendarEvents = data;
        } )
  }

  changeIsChartsCollapsed() {
    this.isChartsCollapsed = !this.isChartsCollapsed;
    if ( !this.isChartsCollapsed ) {
      //this.barChart$ = this.goalService.getUserGoalsAndTasksByCategoryAsNumber()
      this.donutCharts$ = this.goalService.getUserLastThreeGoalsStatistic();;
    }
  }
  eventRender( event ) {
    const title = event.el.getElementsByClassName( 'fc-title' )[ 0 ].textContent;
    event.el.getElementsByClassName( 'fc-title' )[ 0 ].innerHTML = title;
  }

  ngOnDestroy() {
    if ( this.minStatSubscription ) {
      this.minStatSubscription.unsubscribe();
    }
    if ( this.regDateSubscripton ) {
      this.regDateSubscripton.unsubscribe();
    }
    if ( this.PostsSubscripton ) {
      this.PostsSubscripton.unsubscribe();
    }
    if ( this.singlePostSub ) {
      this, this.singlePostSub.unsubscribe();
    }
    if ( this.calendarSubs ) {
      this, this.calendarSubs.unsubscribe();
    }
  }
}
