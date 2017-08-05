import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Catalog, Course, Group, getCourseById } from '../catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})
export class CatalogComponent implements OnInit {
  catalog: Catalog;
  selectedCourses: Set<Course> = new Set<Course>();
  schedules: Group[][];

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getCatalog().then(() => this.unmarshalCourses());
  }

  getCatalog() {
    return this.catalogService.getCatalog().then(catalog => this.catalog = catalog);
  }

  getSchedules() {
    // TODO(lutzky): Scheduling should be its own service
    this.schedules = this.catalogService.getSchedules(Array.from(this.selectedCourses));
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
    var ids: number[] = Array.from(this.selectedCourses).map(course => course.id);
    window.localStorage.setItem("selectedCourses", JSON.stringify(ids));
  }

  unmarshalCourses() {
    var ids: number[] = JSON.parse(window.localStorage.getItem("selectedCourses"));
    for (let id of ids) {
      this.selectedCourses.add(getCourseById(this.catalog, id));
    }
  }
}
