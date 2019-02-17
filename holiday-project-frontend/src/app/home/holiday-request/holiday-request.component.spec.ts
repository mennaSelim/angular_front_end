import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayRequestComponent } from './holiday-request.component';

describe('HolidayRequestComponent', () => {
  let component: HolidayRequestComponent;
  let fixture: ComponentFixture<HolidayRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
