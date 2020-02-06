import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGoalsPageComponent } from './all-goals-page.component';

describe('AllGoalsPageComponent', () => {
  let component: AllGoalsPageComponent;
  let fixture: ComponentFixture<AllGoalsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllGoalsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGoalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
