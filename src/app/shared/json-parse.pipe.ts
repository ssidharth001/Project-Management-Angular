import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'jsonparse'
})
export class JsonParsePipe implements PipeTransform {
    transform(val) {
        return JSON.parse(val)
    }
}