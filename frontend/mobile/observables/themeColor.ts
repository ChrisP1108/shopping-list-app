import { BehaviorSubject } from 'rxjs';
import { getColor, storeColor } from '../middleware/storage';

getColor().then(color => {
    if (color && color !== 'default') {
        subjectThemeColor.next(color)
    }
}) 

const subjectThemeColor: BehaviorSubject<string> = new BehaviorSubject('#67B6FF');

export function getThemeColor(): any {
    return subjectThemeColor;
}

export function setThemeColor(value: string): void {
    storeColor(value);
    subjectThemeColor.next(value);
}