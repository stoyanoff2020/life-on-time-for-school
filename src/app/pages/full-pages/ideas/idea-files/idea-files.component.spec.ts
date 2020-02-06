import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaFilesComponent } from './idea-files.component';

describe( 'DropzoneComponent', () => {
  let component: IdeaFilesComponent;
  let fixture: ComponentFixture<IdeaFilesComponent>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [ IdeaFilesComponent ]
    } )
      .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( IdeaFilesComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  } );

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  } );
} );
