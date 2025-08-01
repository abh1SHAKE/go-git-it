import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'ordinalDate',
    standalone: true
})

export class OrdinalDatePipe implements PipeTransform {
    private datePipe = new DatePipe('en-US');

    transform(value: string | Date): string {
        if (!value) {
            return '';
        }

        const date = new Date(value);
        const day = date.getDate();
        const ordinal = this.getOrdinalSuffix(day);

        const formattedDate = this.datePipe.transform(date, 'd MMM, yyyy');
        return formattedDate?.replace(/(\d+)/, `$1${ordinal}`) || '';
    }

    private getOrdinalSuffix(day: number): string {
        if (day > 3 && day < 21) {
            return 'th';
        }

        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
}