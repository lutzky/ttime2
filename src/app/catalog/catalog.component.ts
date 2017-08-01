import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Faculty } from '../catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})
export class CatalogComponent implements OnInit {
  // TODO(lutzky): Should be a catalog
  faculties: Faculty[];

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.catalogService.getCatalog().then(faculties => this.faculties = faculties);
  }
}
