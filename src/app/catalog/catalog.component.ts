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
    this.getCatalog();
  }

  getCatalog() {
    this.catalogService.getCatalog().then(catalog => this.catalog = catalog);
  }

  addCourse(course: Course) {
    this.selectedCourses.add(course);
  }

  removeCourse(course: Course) {
    this.selectedCourses.delete(course);
  }
}
