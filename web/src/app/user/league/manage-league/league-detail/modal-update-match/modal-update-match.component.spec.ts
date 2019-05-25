import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateMatchComponent } from './modal-update-match.component';

describe('ModalUpdateMatchComponent', () => {
  let component: ModalUpdateMatchComponent;
  let fixture: ComponentFixture<ModalUpdateMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUpdateMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
