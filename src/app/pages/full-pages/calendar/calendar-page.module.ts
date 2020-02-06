import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from "@fullcalendar/angular";

import { CalendarPageComponent } from './calendar-page/calendar-page.component';


@NgModule( {
  declarations: [
    CalendarPageComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
  ]
} )
export class CalendarPageModule { }
