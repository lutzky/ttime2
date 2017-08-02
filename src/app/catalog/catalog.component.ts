import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Catalog } from '../catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [CatalogService]
})
export class CatalogComponent implements OnInit {
  catalog: Catalog;

  constructor(private catalogService: CatalogService) { }

  ngOnInit() {
    this.getCatalog();
  }

  getCatalog() {
    this.catalogService.getCatalog().then(catalog => this.catalog = catalog);
  }
}
