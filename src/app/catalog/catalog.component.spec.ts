import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { WeekdayPipe } from '../weekday.pipe';
import { FromMinutesPipe } from '../from-minutes.pipe';

import { CatalogComponent } from './catalog.component';
import { ScheduleViewerComponent } from '../schedule-viewer/schedule-viewer.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CatalogComponent,
        ScheduleViewerComponent,
        WeekdayPipe,
        FromMinutesPipe
      ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
