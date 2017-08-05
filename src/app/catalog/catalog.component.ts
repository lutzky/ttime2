import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Catalog, Course } from '../catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})
export class CatalogComponent implements OnInit {
  catalog: Catalog;
  selectedCourses: Set<Course> = new Set<Course>();

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getCatalog().then(() => this.unmarshalCourses());
  }

  getCatalog() {
    return this.catalogService.getCatalog().then(catalog => this.catalog = catalog);
  }

  addCourse(course: Course) {
    this.selectedCourses.add(course);
    this.marshalCourses();
  }

  removeCourse(course: Course) {
    this.selectedCourses.delete(course);
    this.marshalCourses();
  }

  marshalCourses() {
    // TODO(lutzky): Only marshal the course IDs.
    var s: string = JSON.stringify(Array.from(this.selectedCourses));
    window.localStorage.setItem("selectedCourses", s);
  }

  unmarshalCourses() {
    var s: string = window.localStorage.getItem("selectedCourses");
    this.selectedCourses = new Set<Course>(JSON.parse(s) as Course[]);
  }
}
