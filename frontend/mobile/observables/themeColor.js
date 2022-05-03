import { Subject } from 'rxjs';

export function defaultColor() {
    return '#67B6FF'
}

export const whiteColor = '#fff'

let subjectThemeColor = new Subject();

export function getThemeColor() {
    return subjectThemeColor;
}

export function setThemeColor(value) {
    subjectThemeColor.next(value);
}