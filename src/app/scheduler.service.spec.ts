import { TestBed, inject } from '@angular/core/testing';
import { SchedulerService } from './scheduler.service';
import { Schedule } from './schedule';
import * as catalog from './catalog';

describe('SchedulerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchedulerService]
    });
  });

  it('should be created', inject([SchedulerService], (service: SchedulerService) => {
    expect(service).toBeTruthy();
  }));

  it('should detect collisions', () => {
    var colliders: catalog.Event[] = [
      {
        group: null, location: "",
        startMinute: 5,
        endMinute: 10,
        day: 1
      },
      {
        group: null, location: "",
        startMinute: 7,
        endMinute: 11,
        day: 1
      },
    ];

    expect(SchedulerService.eventsCollide(colliders)).toBe(true);
  });

  it('should realize different days do not collide', () => {
    var colliders: catalog.Event[] = [
      {
        group: null, location: "",
        day: 1,
        startMinute: 5,
        endMinute: 10,
      },
      {
        group: null, location: "",
        day: 2,
        startMinute: 7,
        endMinute: 11,
      },
    ];

    expect(SchedulerService.eventsCollide(colliders)).toBe(false);
  });

  it('should schedule trivial schedule as expected', inject([SchedulerService], (service: SchedulerService) => {
    var event1_1: catalog.Event = {
      group: null,
      day: 1,
      startMinute: 5,
      endMinute: 10,
      location: "",
    }

    var course1: catalog.Course = {
      faculty: null,
      id: 1,
      name: "Course 1",
      academicPoints: 0,
      lecturerInCharge: "",
      groups: [
        {
          course: course1,
          id: 1,
          teachers: [],
          type: "lecture",
          events: [event1_1],
        },
      ],
    }
    var courses: catalog.Course[] = [
      course1
    ];

    var schedule1: Schedule = {events: [event1_1]};
    expect(service.getSchedules(courses)).toEqual([schedule1]);
  }));
});
