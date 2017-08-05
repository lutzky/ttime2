import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Catalog, Faculty, Course, Group } from './catalog';

import 'rxjs/add/operator/toPromise';
import * as product from 'cartesian-product';

@Injectable()
export class CatalogService {
  // TODO(lutzky): catalogUrl should be configurable
  private catalogUrl = 'https://storage.googleapis.com/dev-machine-152620.appspot.com/latest.json';

  constructor(private http: Http) { }

  getCatalog(): Promise<Catalog> {
    return this.http.get(this.catalogUrl)
      .toPromise()
      .then(response => ({ faculties: response.json() } as Catalog))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    // TODO(lutzky): Make errors clearly visible to user
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

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
      c => CatalogService.groupsByType(c)
    ).reduce((a, b) => a.concat(b), []);

    console.info("groupBins:", groupBins);

    // TODO(lutzky): Apply filters
    return product(groupBins);
  }
}
