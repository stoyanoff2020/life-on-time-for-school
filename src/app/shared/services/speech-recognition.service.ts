import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
declare let webkitSpeechRecognition: any;

@Injectable()
export class SpeechRecognitionService {
  speechRecognition: any;

  constructor ( private zone: NgZone ) {
  }

  record() {
    let final_transcript = '';

    return Observable.create( observer => {
      if ( 'webkitSpeechRecognition' in window ) {
        this.speechRecognition = new webkitSpeechRecognition();;
        this.speechRecognition.continuous = true;
        //this.speechRecognition.interimResults = true;
        this.speechRecognition.lang = 'en-us';
        this.speechRecognition.maxAlternatives = 1;
      }
      else {
        alert( 'Your browser dont support speech recognition' )
      }
      this.speechRecognition.onresult = function ( event ) {
        console.log( event );
        let final_transcript = '';

        console.log( this.speechRecognition );
        this.speechRecognition.continuous = true;
        this.speechRecognition.interimResults = true;
        this.speechRecognition.lang = 'en-US';
        this.speechRecognition.maxAlternatives = 1;

        let interim_transcript = '';

        for ( let i = event.resultIndex; i < event.results.length; ++i ) {
          if ( event.results[ i ].isFinal ) {
            final_transcript = event.results[ i ][ 0 ].transcript;
          } else {
            interim_transcript += event.results[ i ][ 0 ].transcript;
          }
        }
        //this.item.name = final_transcript;
        //console.log( final_transcript );
        // };
        // this.zone.run( () => {
        //   observer.next( final_transcript );
        // } );

        this.speechRecognition.onerror = ( error ) => {
          observer.error( error );
        };

        this.speechRecognition.onend = () => {
          observer.complete();
        };
        this.speechRecognition.start();
        console.log( "Say something - We are listening !!!" );

      }
    } );
  }


  DestroySpeechObject() {
    if ( this.speechRecognition )
      this.speechRecognition.stop();
  }

}
