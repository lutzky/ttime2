export class Faculty {
  catalog: Catalog;
  name: string;
  courses: Course[];
}

export class Course {
  faculty: Faculty;
  id: number;
  name: string;
  academicPoints: number;
  lecturerInCharge: string;
  // TODO(lutzky): weeklyHours
  // TODO(lutzky): testDates
  groups: Group[];
}

export class Group {
  course: Course;
  id: number;
  teachers: string[];
  events: Event[];
  type: string;
}

export class Event {
  group: Group;
  day: number;
  location: string;
  startMinute: number;
  endMinute: number;
}

export class Catalog {
  faculties: Faculty[];
}

export function getCourseById(catalog: Catalog, id: number): Course {
  for (let faculty of catalog.faculties) {
    for (let course of faculty.courses) {
      if (course.id == id) {
        return course;
      }
    }
  }
  return null;
}
