import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoviesViewComponent } from './movies-view.component';

describe('MoviesViewComponent', () => {
  let component: MoviesViewComponent;
  let fixture: ComponentFixture<MoviesViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
