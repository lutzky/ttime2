import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { WeekdayPipe } from './weekday.pipe';
import { FromMinutesPipe } from './from-minutes.pipe';
import { ScheduleViewerComponent } from './schedule-viewer/schedule-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    WeekdayPipe,
    FromMinutesPipe,
    ScheduleViewerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
