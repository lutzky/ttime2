import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Catalog, Course, getCourseById } from '../catalog';

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

  dayOfWeek(dayNumber: number): string {
    return ["Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"][dayNumber];
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
