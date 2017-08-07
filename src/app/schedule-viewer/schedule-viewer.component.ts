import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import * as catalog from '../catalog';
import { SchedulerService } from '../scheduler.service';

@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.css']
})
export class ScheduleViewerComponent implements OnInit {
  current: number = 0;

  constructor(
    private schedulerService: SchedulerService
  ) { }
  @Input() schedules: Schedule[];

  ngOnInit() {
  }

  private normalizeCurrent() {
    this.current = (this.current + this.schedules.length) % this.schedules.length;
  }

  byDay(schedule: Schedule): catalog.Event[][] {
    var events: catalog.Event[] = schedule.events.slice();
    SchedulerService.sortEvents(events);

    var result: catalog.Event[][] = [[]];
    var currentDay: number = events[0].day;

    for (let e of events) {
      if (e.day != currentDay) {
        result.push([]);
        currentDay = e.day;
      }
      result[result.length - 1].push(e);
    }

    return result;
  }

  prev() {
    this.current--;
    this.normalizeCurrent();
  }

  next() {
    this.current++;
    this.normalizeCurrent();
  }

}
