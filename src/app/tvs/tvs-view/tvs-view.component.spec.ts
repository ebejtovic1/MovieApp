import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TvsViewComponent } from './tvs-view.component';

describe('TvsViewComponent', () => {
  let component: TvsViewComponent;
  let fixture: ComponentFixture<TvsViewComponent>;

  beforeEach(async(() => {
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
