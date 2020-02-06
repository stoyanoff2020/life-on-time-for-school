import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAllGoalsCardComponent } from './single-all-goals-card.component';

describe('SingleAllGoalsCardComponent', () => {
  let component: SingleAllGoalsCardComponent;
  let fixture: ComponentFixture<SingleAllGoalsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAllGoalsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAllGoalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
