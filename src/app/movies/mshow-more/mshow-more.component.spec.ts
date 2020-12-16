import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MshowMoreComponent } from './mshow-more.component';

describe('MshowMoreComponent', () => {
  let component: MshowMoreComponent;
  let fixture: ComponentFixture<MshowMoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MshowMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MshowMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
