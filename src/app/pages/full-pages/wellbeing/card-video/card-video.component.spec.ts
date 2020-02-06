import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVideoComponent } from './card-video.component';

describe('CardVideoComponent', () => {
  let component: CardVideoComponent;
  let fixture: ComponentFixture<CardVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
