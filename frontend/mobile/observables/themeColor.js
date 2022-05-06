import { BehaviorSubject } from 'rxjs';

const subjectThemeColor = new BehaviorSubject('#67B6FF');

export function getThemeColor() {
    return subjectThemeColor;
}

export function setThemeColor(value) {
    subjectThemeColor.next(value);
}