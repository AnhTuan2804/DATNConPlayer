import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPairMatchComponent } from './modal-pair-match.component';

describe('ModalPairMatchComponent', () => {
  let component: ModalPairMatchComponent;
  let fixture: ComponentFixture<ModalPairMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPairMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPairMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
