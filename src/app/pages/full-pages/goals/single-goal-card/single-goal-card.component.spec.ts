import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGoalCardComponent } from './single-goal-card.component';

describe('SingleGoalCardComponent', () => {
  let component: SingleGoalCardComponent;
  let fixture: ComponentFixture<SingleGoalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleGoalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleGoalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
