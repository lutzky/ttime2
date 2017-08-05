import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { WeekdayPipe } from './weekday.pipe';
import { FromMinutesPipe } from './from-minutes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    WeekdayPipe,
    FromMinutesPipe
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
