import { Subject } from 'rxjs';

let subjectData = new Subject();

export function getData() {
    return subjectData;
}

export function setData(value) {
    return subjectData.next(value)
}