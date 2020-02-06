import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIdeaCreateEditComponent } from './modal-idea-create-edit.component';

describe('ModalIdeaCreateEditComponent', () => {
  let component: ModalIdeaCreateEditComponent;
  let fixture: ComponentFixture<ModalIdeaCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIdeaCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIdeaCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
