import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalog, Faculty } from './catalog';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CatalogService {
  // TODO(lutzky): catalogUrl should be configurable
  private catalogUrl = 'https://storage.googleapis.com/repy-176217.appspot.com/latest.json';

  constructor(private http: HttpClient) { }

  getCatalog(): Promise<Catalog> {
    return this.http.get<Faculty[]>(this.catalogUrl)
      .toPromise()
      .then(response => (CatalogService.updateUplinks({ faculties: response } as Catalog)))
      .catch(this.handleError);
  }

  static updateUplinks(catalog: Catalog): Catalog {
    for (let faculty of catalog.faculties) {
      faculty.catalog = catalog;
      for (let course of faculty.courses) {
        course.faculty = faculty;
        if (course.groups) {
          for (let group of course.groups) {
            group.course = course;
            if (group.events) {
              for (let event of group.events) {
                event.group = group;
              }
            }
          }
        }
      }
    }
    return catalog;
  }

  private handleError(error: any) {
    // TODO(lutzky): Make errors clearly visible to user
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
