import { Injectable } from '@angular/core';
import * as catalog from './catalog';
import { Schedule } from './schedule';

import * as product from 'cartesian-product';

@Injectable()
export class SchedulerService {

  constructor() { }

  private static groupsByType(course: catalog.Course): catalog.Group[][] {
    // TODO(lutzky): Test me, move me into scheduling service
    var m: Map<string, catalog.Group[]> = new Map();

    for (let group of course.groups) {
      if (!m.has(group.type)) {
        m.set(group.type, []);
      }
      m.get(group.type).push(group);
    }

    return Array.from(m.values());
  }

  private static groupsToSchedule(groups: catalog.Group[]): Schedule {
    var e: catalog.Event[] = groups.reduce((a, b) => a.concat(b.events), []);
    return { events: e };
  }

  getSchedules(courses: catalog.Course[]): Schedule[] {
    // Each "bin" in groupBins is a collection of groups we have to choose
    // exactly one of to get a schedule.
    var groupBins: catalog.Group[][] = courses.map(
      c => SchedulerService.groupsByType(c)
    ).reduce((a, b) => a.concat(b), []);

    var groupProduct: catalog.Group[][] = product(groupBins);
    var schedules: Schedule[] =  groupProduct.map(SchedulerService.groupsToSchedule);

    // TODO(lutzky): Generic mechanism for additional filters
    var numSchedules = schedules.length;
    schedules = schedules.filter(this.filterNoCollisions);
    console.info(`Filetered ${numSchedules - schedules.length} of ${numSchedules} schedules`);

    return schedules;
  }

  static sortEvents(events: catalog.Event[]) {
    events.sort(function(a: catalog.Event, b: catalog.Event) {
      if (a.day != b.day) {
        return a.day - b.day;
      }
      return a.startMinute - b.startMinute;
    })
  }

  private static eventsCollide(events: catalog.Event[]): boolean {
    var e: catalog.Event[] = events.slice()
    SchedulerService.sortEvents(e);

    for (var i = 0; i < e.length - 1; i++) {
      if (e[i].day == e[i+1].day) {
        if (e[i+1].startMinute < e[i].endMinute) {
          return true;
        }
      }
    }

    return false;
  }

  filterNoCollisions(schedule: Schedule): boolean {
    return !SchedulerService.eventsCollide(schedule.events);
  }
}
