import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Catalog, Faculty, Course } from './catalog';

import 'rxjs/add/operator/toPromise';

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

  getCourse(id: number): Promise<Course> {
    return this.getCatalog().then(function(catalog: Catalog) {
      for (let faculty of catalog.faculties) {
        for (let course of faculty.courses) {
          if (course.id == id) {
            return course;
          }
        }
      }
      return null;
    })
    // TODO(lutzky): This should be cached from the previous getCatalog()
  }

  private handleError(error: any) {
    // TODO(lutzky): Make errors clearly visible to user
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
