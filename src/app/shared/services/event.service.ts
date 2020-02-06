import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { EmitEvent } from "../models/emitEvent";

@Injectable( {
  providedIn: 'root'
} )
export class EventService {

  private subject$ = new Subject()

  emit( event: EmitEvent ) {
    this.subject$.next( event );
  }

  on( event: string, action: any ): Subscription {
    return this.subject$.pipe(
      filter( ( e: EmitEvent ) => e.name == event ),
      map( ( e: EmitEvent ) => e.value ) ).subscribe( action );
  }

}
