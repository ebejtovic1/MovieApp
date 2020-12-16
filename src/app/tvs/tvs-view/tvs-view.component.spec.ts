import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TvsViewComponent } from './tvs-view.component';

describe('TvsViewComponent', () => {
  let component: TvsViewComponent;
  let fixture: ComponentFixture<TvsViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TvsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TvsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
