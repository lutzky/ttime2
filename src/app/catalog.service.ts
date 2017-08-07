import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Catalog } from './catalog';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CatalogService {
  // TODO(lutzky): catalogUrl should be configurable
  private catalogUrl = 'https://storage.googleapis.com/dev-machine-152620.appspot.com/latest.json';

  constructor(private http: Http) { }

  getCatalog(): Promise<Catalog> {
    return this.http.get(this.catalogUrl)
      .toPromise()
      .then(response => (CatalogService.updateUplinks({ faculties: response.json() } as Catalog)))
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
