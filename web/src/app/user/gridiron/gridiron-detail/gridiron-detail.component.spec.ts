import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridironDetailComponent } from './gridiron-detail.component';

describe('GridironDetailComponent', () => {
  let component: GridironDetailComponent;
  let fixture: ComponentFixture<GridironDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridironDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridironDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
