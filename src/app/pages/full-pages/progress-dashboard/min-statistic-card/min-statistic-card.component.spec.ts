import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinStatisticCardComponent } from './min-statistic-card.component';

describe('MinStatisticCardComponent', () => {
  let component: MinStatisticCardComponent;
  let fixture: ComponentFixture<MinStatisticCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinStatisticCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinStatisticCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
