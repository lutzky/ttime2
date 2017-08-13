import { TestBed, async } from '@angular/core/testing';

// TODO(lutzky): Do we really need to import and declare every module,
// every pipe, everything altogether - in every component that uses it?
import { WeekdayPipe } from './weekday.pipe';
import { FromMinutesPipe } from './from-minutes.pipe';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ScheduleViewerComponent } from './schedule-viewer/schedule-viewer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CatalogComponent,
        ScheduleViewerComponent,
        WeekdayPipe,
        FromMinutesPipe
      ],
      imports: [ HttpClientTestingModule ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('TTime2');
  }));
});
