import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellbeingPagesComponent } from './wellbeing-pages.component';

describe('WellbeingPagesComponent', () => {
  let component: WellbeingPagesComponent;
  let fixture: ComponentFixture<WellbeingPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellbeingPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellbeingPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
