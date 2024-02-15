import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
	name: "inclinator",
})
export class Inclinator implements PipeTransform {
	transform(value: number): string {
		if (value === 1) return "1 пересадка";
		if (value > 1 && value < 5 ) return `${value} пересадки`;
		return `${value} пересадок`
	}
	
}