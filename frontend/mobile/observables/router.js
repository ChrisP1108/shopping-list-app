import { Subject } from 'rxjs';

let subjectRoute = new Subject();

const routeHistory = [];

export function getRoute() {
    return subjectRoute;
}

export function setRoute(route) {
    routeHistory.push(route);
    subjectRoute.next(route);
}

export function goBackRoute() {
    const back = routeHistory.pop()
    if (back) {
        subjectRoute.next(back)
    }
}