import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveHolidayRequestComponent } from './approve-holiday-request.component';

describe('ApproveHolidayRequestComponent', () => {
  let component: ApproveHolidayRequestComponent;
  let fixture: ComponentFixture<ApproveHolidayRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveHolidayRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveHolidayRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
