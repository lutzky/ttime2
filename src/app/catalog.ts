export class Faculty {
  name: string;
  courses: Course[];
}

export class Course {
  id: number;
  name: string;
  academicPoints: number;
  lecturerInCharge: string;
  // TODO(lutzky): weeklyHours
  // TODO(lutzky): testDates
  groups: Group[];
}

export class Group {
  id: number;
  teachers: string[];
  events: Event[];
  type: string;
}

export class Event {
  day: number;
  location: string;
  startMinute: number;
  endMinute: number;
}

export class Catalog {
  faculties: Faculty[];
}

