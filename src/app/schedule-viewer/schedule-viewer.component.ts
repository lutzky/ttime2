import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../schedule';

@Component({
  selector: 'app-schedule-viewer',
  templateUrl: './schedule-viewer.component.html',
  styleUrls: ['./schedule-viewer.component.css']
})
export class ScheduleViewerComponent implements OnInit {
  current: number = 0;

  constructor() { }
  @Input() schedules: Schedule[];

  ngOnInit() {
  }

  private normalizeCurrent() {
    this.current = (this.current + this.schedules.length) % this.schedules.length;
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
