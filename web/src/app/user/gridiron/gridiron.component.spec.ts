import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridironComponent } from './gridiron.component';

describe('GridironComponent', () => {
  let component: GridironComponent;
  let fixture: ComponentFixture<GridironComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridironComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridironComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
