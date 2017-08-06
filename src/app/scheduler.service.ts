import { Injectable } from '@angular/core';
import { Course, Group } from './catalog';

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

  getSchedules(courses: Course[]): Group[][] {
    // Each "bin" in groupBins is a collection of groups we have to choose
    // exactly one of to get a schedule.
    var groupBins: Group[][] = courses.map(
      c => SchedulerService.groupsByType(c)
    ).reduce((a, b) => a.concat(b), []);

    // TODO(lutzky): Apply filters
    return product(groupBins);
  }
}
