import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsPageComponent } from './goals-page.component';

describe( 'HealthWellbeingComponent', () => {
  let component: GoalsPageComponent;
  let fixture: ComponentFixture<GoalsPageComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [ GoalsPageComponent ]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( GoalsPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
