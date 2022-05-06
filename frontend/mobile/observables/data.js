import { BehaviorSubject } from 'rxjs';

const subjectData = new BehaviorSubject(null);

export function getData() {
    return subjectData;
}

export function setData(value) {
    return subjectData.next(value)
}