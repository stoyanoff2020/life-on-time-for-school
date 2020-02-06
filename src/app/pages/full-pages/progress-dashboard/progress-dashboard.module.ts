import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartistModule } from "ng-chartist"
import { FullCalendarModule } from "@fullcalendar/angular"

import { SharedModule } from 'app/shared/shared.module';

import { ProgressDashboardComponent } from './progress-dashboard-page/progress-dashboard.component';
import { ChartComponent } from './donut-chart/chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { MinStatisticCardComponent } from './min-statistic-card/min-statistic-card.component';

@NgModule( {
  exports: [ ProgressDashboardComponent ],
  declarations: [
    ProgressDashboardComponent,
    ChartComponent,
    BarChartComponent,
    SinglePostComponent,
    BlogPostsComponent,
    MinStatisticCardComponent,
  ],
  imports: [
    CommonModule,
    ChartistModule,
    FullCalendarModule,
    SharedModule,
  ]
} )
export class ProgressDashboardModule {

}
