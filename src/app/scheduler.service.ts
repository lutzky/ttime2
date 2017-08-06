import { Injectable } from '@angular/core';
import { Course, Group, Event } from './catalog';
import { Schedule } from './schedule';

import * as product from 'cartesian-product';

@Injectable()
export class SchedulerService {

  constructor() { }

  private static groupsByType(course: Course): Group[][] {
    // TODO(lutzky): Test me, move me into scheduling service
    var m: Map<string, Group[]> = new Map();

    for (let group of course.groups) {
      if (!m.has(group.type)) {
        m.set(group.type, []);
      }
      m.get(group.type).push(group);
    }

    return Array.from(m.values());
  }

  getSchedules(courses: Course[]): Schedule[] {
    // Each "bin" in groupBins is a collection of groups we have to choose
    // exactly one of to get a schedule.
    var groupBins: Group[][] = courses.map(
      c => SchedulerService.groupsByType(c)
    ).reduce((a, b) => a.concat(b), []);

    var groupProduct: Group[][] = product(groupBins);
    var schedules: Schedule[] =  groupProduct.map(x => ({groups: x}));

    // TODO(lutzky): Generic mechanism for additional filters
    var numSchedules = schedules.length;
    schedules = schedules.filter(this.filterNoCollisions);
    console.info(`Filetered ${numSchedules - schedules.length} of ${numSchedules} schedules`);

    return schedules;
  }

  private static eventsCollide(events: Event[]): boolean {
    var e: Event[] = events.slice()
    e.sort(function(a, b: Event) {
      if (a.day != b.day) {
        return a.day - b.day;
      }
      return a.startMinute - b.startMinute;
    })

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
    var events: Event[] = schedule.groups.reduce(function(es: Event[], g: Group): Event[] {
      return es.concat(g.events);
    }, [])
    return !SchedulerService.eventsCollide(events);
  }
}
