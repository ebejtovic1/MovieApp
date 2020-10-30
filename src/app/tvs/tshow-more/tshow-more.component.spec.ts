import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TshowMoreComponent } from './tshow-more.component';

describe('TshowMoreComponent', () => {
  let component: TshowMoreComponent;
  let fixture: ComponentFixture<TshowMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TshowMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TshowMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
