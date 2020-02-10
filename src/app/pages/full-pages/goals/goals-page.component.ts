import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Scroll } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Goal } from 'app/shared/models/goal';
import { GoalCreate } from 'app/shared/models/goalCreate';
import { TaskCreate } from 'app/shared/models/taskCreate';
import { ActionInfo } from 'app/shared/models/actionInfo';
import { ItemInfo } from 'app/shared/models/itemInfo';
import { Category } from 'app/shared/models/category';

import { GoalService } from 'app/shared/services/goal.service';
import { TaskService } from 'app/shared/services/task.service';
import { UserService } from 'app/shared/services/user.service';
import { ModalService } from "app/shared/services/modal.service";
import { EventService } from 'app/shared/services/event.service';
import { PostService } from 'app/shared/services/post.service';

import { convertDateToString } from "app/shared/utilities";
//import { ViewportScroller } from '@angular/common';

import { DOCUMENT } from '@angular/common';
import { GlobalService } from 'app/shared/services/global.service';



@Component( {
  selector: 'app-goals-page',
  templateUrl: './goals-page.component.html',
  styleUrls: [ './goals-page.component.scss' ]
} )
export class GoalsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild( 'type', { static: false } ) type: any;

  currentGoalCategory: Category;
  goalCategories: Array<Category>;
  goals$;
  articles$;
  private path: string;
  private currentUserClass: string;
  private goalCategoriesSubscription: Subscription;
  private deleteSubscription: Subscription;
  private createGoalSubscription: Subscription;
  private createTaskSubscription: Subscription;
  private editGoalSubscription: Subscription;
  private editTaskSubscription: Subscription;
  private modalCreateSubscription: Subscription;
  private modalDeleteSubscription: Subscription;
  private modalStatusSubscription: Subscription;
  private pathSubs: Subscription;
  private goalTasksCompletedSubs: Subscription;
  private getTasksSubs: Subscription;

  constructor (
    private modalService: ModalService,
    private route: ActivatedRoute,
    private goalService: GoalService,
    private taskService: TaskService,
    private eventService: EventService,
    private userService: UserService,
    private globalService: GlobalService,
    private postService: PostService,
    private router: Router,
    //private vps: ViewportScroller,
    @Inject( DOCUMENT ) private document: Document
  ) {

  }

  ngOnInit(): void {
    // console.log( this.router[ 'rawUrlTree' ].fragment );
    // this.vps.scrollToAnchor( 'me' );
    //this.router.events.subscribe( e => console.log( e ) );
    this.pathSubs = this.route.url.subscribe( data => {
      this.path = data[ 0 ].path;

      this.goalCategoriesSubscription = this.userService.getUserAvailableCategoriesObj()
        .subscribe( ( studentInfo ) => {
          console.log( studentInfo.categories );
          this.globalService.setAppCategories( studentInfo.categories );
          this.currentUserClass = studentInfo.class;
          this.goalCategories = studentInfo.categories;
          this.currentGoalCategory = this.goalCategories
            .find( category => category.pathEnd === this.path );
          if ( !this.currentGoalCategory ) {
            this.router.navigate( [ "/error" ] )
          } else {
            this.loadPageGoals();
          }
        } );
    } )
    this.modalCreateSubscription = this.eventService.on( 'confirm create/edit', ( actionInfo => this.mapAction( actionInfo ) ) );
    this.modalDeleteSubscription = this.eventService.on( 'confirm delete', ( itemInfo => this.deleteItem( itemInfo ) ) );
    this.modalStatusSubscription = this.eventService.on( 'change status', ( itemInfo => this.changeStatus( itemInfo ) ) )
  }
  ngAfterViewInit(): void {
    // const tree = this.router.parseUrl( this.router.url );
    // console.log( tree.fragment );
    // this.vps.scrollToAnchor( tree.fragment );
    // const element = this.document.querySelector( '#' + tree.fragment );
    // console.log( element );
    // console.log( tree );
    // element.scrollIntoView( true );

    // this.router.events
    //   .pipe(
    //     filter( e => e instanceof Scroll ) )
    //   .subscribe( ( e: any ) => { this.vps.scrollToAnchor( e.anchor ); }
    //   );
    // this.router.events.subscribe( e => console.log( e ) );
  }

  private mapAction( actionInfo: ActionInfo ) {
    if ( actionInfo.actionType === 'create' ) {
      if ( actionInfo.itemType === 'goal' ) {
        this.createGoal( actionInfo.formValue );
      } else if ( actionInfo.itemType === 'action' ) {
        this.createTask( actionInfo.formValue, actionInfo.goalId )
      }

    } else if ( actionInfo.actionType === 'edit' ) {
      if ( actionInfo.itemType === 'goal' ) {
        this.editGoal( actionInfo.formValue, actionInfo.itemId );
      } else if ( actionInfo.itemType === 'action' ) {
        this.editTask( actionInfo.formValue, actionInfo.itemId );
      }
    }
  }

  private createGoal( formValue ) {
    let goal: GoalCreate = formValue;
    const date = formValue.until_date;
    goal.until_date = convertDateToString( date.day, date.month, date.year, '-' );
    goal.category_id = this.currentGoalCategory.id;
    this.createGoalSubscription = this.goalService.postCreateGoal( goal )
      .subscribe( data => {
        this.loadPageGoals();
      } )
  }

  private createTask( formValue, goalId: string ) {
    let task: TaskCreate = formValue;
    task.goal_id = goalId;
    const date = formValue.until_date;
    task.until_date = convertDateToString( date.day, date.month, date.year, '-' );

    this.createTaskSubscription = this.taskService.postCreateTask( task )
      .subscribe( data => {
        this.goalTasksCompletedSubs = this.goalService.getGoalInfoForStatus( goalId )
          .subscribe( goalInfo => {
            if ( goalInfo.status == '1' ) {
              const item = {
                id: goalId,
                status: 0
              }
              this.changeGoalStatus( goalId, item )
            } else {
              this.loadPageGoals();
            }
          } )
      } )
  }

  private editGoal( formValue, goalId: string ) {
    const goal: GoalCreate = formValue;
    const date = formValue.until_date;
    goal.until_date = convertDateToString( date.day, date.month, date.year, '-' )
    this.editTaskSubscription = this.goalService.putEditGoalById( goalId, goal )
      .subscribe( data => {
        this.loadPageGoals();
      } )
  }

  private editTask( formValue, taskId: string ) {
    let task: TaskCreate = formValue;
    const date = formValue.until_date;
    task.until_date = convertDateToString( date.day, date.month, date.year, '-' )
    this.editTaskSubscription = this.taskService.putEditTaskById( taskId, task )
      .subscribe( data => {
        this.loadPageGoals();
      } )
  }

  private deleteItem( itemInfo: ItemInfo ) {
    if ( itemInfo.itemType === 'goal' ) {
      this.deleteSubscription = this.goalService.deleteGoalById( itemInfo.itemId )
        .subscribe( data => {
          this.loadPageGoals();
        } )
    } else if ( itemInfo.itemType === 'action' ) {
      this.getTasksSubs =
        this.taskService.getTaskById( itemInfo.itemId )
          .subscribe( data => {
            const tasksGoalId = data[ 'data' ][ 'goal_id' ];
            this.deleteSubscription =
              this.taskService.deleteTaskById( itemInfo.itemId )
                .subscribe( data => {
                  this.autoChangeGoalStatusDependingTasksStatus( tasksGoalId )
                } )
          } )

    }
  }

  private changeStatus( itemInfo: any ) {
    const item = {
      id: itemInfo.itemId,
      status: itemInfo.status === 0 ? 1 : 0
    }
    if ( itemInfo.itemType === 'goal' ) {
      this.autoChangeGoalStatusDependingTasksStatus( item.id );
      //this.changeGoalStatus( itemInfo.itemId, item )
    } else if ( itemInfo.itemType === 'action' ) {
      this.editTaskSubscription = this.taskService.putEditTaskById( itemInfo.itemId, item )
        .subscribe( data => {
          const action = data[ 'data' ];
          const goalId = action.goal_id;
          this.autoChangeGoalStatusDependingTasksStatus( goalId );
        } );
    }
  }

  private autoChangeGoalStatusDependingTasksStatus( goalId: string ) {
    this.goalTasksCompletedSubs = this.goalService.getGoalInfoForStatus( goalId )
      .subscribe( goalInfo => {
        //Autocomplete Goal, when all tasks are completed
        if ( goalInfo.isTasksCompleted === true ) {
          if ( goalInfo.status == '0' ) {
            const item = {
              id: goalId,
              status: 1
            }
            this.changeGoalStatus( goalId, item )
          }
        } else {
          //Autouncomplete Goal, when not all tasks are completed
          if ( goalInfo.status == '1' ) {
            const item = {
              id: goalId,
              status: 0
            }
            this.changeGoalStatus( goalId, item )
          }
        }
        this.loadPageGoals();
      } )
  }

  private changeGoalStatus( goalId: string, goal ) {
    this.editGoalSubscription = this.goalService.putEditGoalById( goalId, goal )
      .subscribe( data => {
        this.loadPageGoals();
      } );
  }

  private loadPageGoals() {
    this.goals$ = this.goalService.getGoalsByCategory( this.currentGoalCategory.title );
    this.articles$ = this.postService.getArticlesByCategoryIdAndUserClassId( this.currentGoalCategory.id, this.currentUserClass );
    // const tree = this.router.parseUrl( this.router.url );
    // const element = document.querySelector( "#" + tree.fragment );
    // console.log( tree ); {
    //   element.scrollIntoView( true )
    // }
  }

  openModal( name: string, itemType: string, actionType: string, item?: any ) {
    this.modalService.open( name, itemType, actionType, item );
  }

  ngOnDestroy() {
    if ( this.pathSubs ) {
      this.pathSubs.unsubscribe();
    }
    if ( this.deleteSubscription ) {
      this.deleteSubscription.unsubscribe();
    }
    if ( this.createGoalSubscription ) {
      this.createGoalSubscription.unsubscribe();
    }
    if ( this.createTaskSubscription ) {
      this.createTaskSubscription.unsubscribe();
    }
    if ( this.editGoalSubscription ) {
      this.editGoalSubscription.unsubscribe();
    }
    if ( this.editTaskSubscription ) {
      this.editTaskSubscription.unsubscribe();
    }
    if ( this.modalCreateSubscription ) {
      this.modalCreateSubscription.unsubscribe();
    }
    if ( this.modalDeleteSubscription ) {
      this.modalDeleteSubscription.unsubscribe();
    }
    if ( this.modalStatusSubscription ) {
      this.modalStatusSubscription.unsubscribe();
    }
    if ( this.goalCategoriesSubscription ) {
      this.goalCategoriesSubscription.unsubscribe();
    }
    if ( this.goalTasksCompletedSubs ) {
      this.goalTasksCompletedSubs.unsubscribe();
    }
  }
}
