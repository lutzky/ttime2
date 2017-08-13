import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeekdayPipe } from '../weekday.pipe';
import { FromMinutesPipe } from '../from-minutes.pipe';
import { SchedulerService } from '../scheduler.service';

import { ScheduleViewerComponent } from './schedule-viewer.component';

describe('ScheduleViewerComponent', () => {
  let component: ScheduleViewerComponent;
  let fixture: ComponentFixture<ScheduleViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleViewerComponent, WeekdayPipe, FromMinutesPipe ],
      providers: [
        { provide: SchedulerService, useClass: SchedulerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
