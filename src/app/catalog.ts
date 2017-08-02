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
  // TODO(lutzky): groups: Group[];
}

export class Catalog {
  faculties: Faculty[];
}

