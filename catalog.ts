namespace TTime {
	interface Event {
		Day: number;
		Location: string;
		StartHour: number;
		EndHour: number;
	}
	
	interface Group {
		ID: number;
		Teachers: string[];
		Type: string; // Should actually be an enum
		Events: Event[];
	}
	
	interface WeeklyHours {
		Lecture: number;
		Tutorial: number;
		Lab: number;
		Project: number;
	}
	
	interface TestDate {
		Year: number;
		Month: number;
		Day: number;
	}
	
	interface Course {
		ID: number;
		Name: string;
		AcademicPoints: number;
		LecturerInCharge: string;
		WeeklyHours: WeeklyHours;
	}
	
	export function overlap(e1: Event, e2: Event):boolean {
		return e1.Day === e2. Day &&
			e1.StartHour < e2.EndHour &&
			e1.EndHour > e2.StartHour;
	}
	
	export function hasCollisions(groups: Group[]):boolean {
		let events: Event[] = [];
		for (let g of groups) {
			for (let e of g.Events) {
				events.push(e);
			}
		}
		events.sort(function(a: Event, b:Event): number {
				if (a.Day != b.Day) {
					return a.Day - b.Day;
				} else {
					return a.StartHour - b.StartHour;
				}
			});
		
		for (let i = 0; i < events.length - 1; i++) {
			if (overlap(events[i], events[i+1])) {
				return false;
			}
		}
		return true;
	}
}

// TODO(lutzky): Major TODO - it's not StartHour, it's actually StartMinute... EndMinute too.

let e1 = {
	Day: 2,
	StartHour: 4,
	EndHour: 6,
	Location: "Some location"
}

let e2 = {
	Day: 2,
	StartHour: 5,
	EndHour: 7,
	Location: "Some other location"
}

console.log(`Overlap: ${TTime.overlap(e1,e2)}`);
