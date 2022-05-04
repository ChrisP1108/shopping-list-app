import { BehaviorSubject } from 'rxjs';

let subjectRoute = new BehaviorSubject(null);

const routeHistory = [];

export function getRoute() {
    return subjectRoute;
}

export function setRoute(route) {
    routeHistory.push(route);
    subjectRoute.next(route);
}

export function goBackRoute() {
    const back = routeHistory.pop();
    if (back) {
        subjectRoute.next(routeHistory[routeHistory.length - 1])
    }
}