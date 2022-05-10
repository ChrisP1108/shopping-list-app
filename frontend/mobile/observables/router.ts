import { BehaviorSubject } from 'rxjs';

let routeData = {
    current: null,
    history: []
}

const subjectRoute = new BehaviorSubject(routeData);

export function getRoute() {
    return subjectRoute;
}

export function setRoute(route) {
    if (routeData.current) {
        routeData.history.push(routeData.current)
    }
    routeData.current = route;
    subjectRoute.next(routeData);
}

export function goBackRoute() {
    const back = routeData.history.pop();
    if (routeData.history.length) {
        routeData.current = back;
        subjectRoute.next(routeData);
    }
}