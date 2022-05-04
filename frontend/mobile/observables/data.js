import { BehaviorSubject } from 'rxjs';

let subjectData = new BehaviorSubject(null);

export function getData() {
    return subjectData;
}

export function setData(value) {
    return subjectData.next(value)
}