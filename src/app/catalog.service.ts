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

  private handleError(error: any) {
    // TODO(lutzky): Make errors clearly visible to user
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
