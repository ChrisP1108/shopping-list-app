import { BehaviorSubject } from 'rxjs';
import { getColor, storeColor } from '../middleware/storage';

getColor().then(color => {
    if (color && color !== 'default') {
        subjectThemeColor.next(color)
    }
}) 

const subjectThemeColor = new BehaviorSubject('#67B6FF');

export function getThemeColor() {
    return subjectThemeColor;
}

export function setThemeColor(value) {
    storeColor(value);
    subjectThemeColor.next(value);
}