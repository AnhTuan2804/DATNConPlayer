import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGridironComponent } from './home-gridiron.component';

describe('HomeGridironComponent', () => {
  let component: HomeGridironComponent;
  let fixture: ComponentFixture<HomeGridironComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGridironComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGridironComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
