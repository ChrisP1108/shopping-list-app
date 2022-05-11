import { BehaviorSubject } from 'rxjs';

interface routeData {
    current: string | null,
    history: string[]
}

const routeData: routeData = {
    current: null,
    history: []
}

const subjectRoute: BehaviorSubject<any>  = new BehaviorSubject(routeData);

export function getRoute(): any {
    return subjectRoute;
}

export function setRoute(route: string): void {
    if (routeData.current) {
        routeData.history.push(routeData.current)
    }
    routeData.current = route;
    subjectRoute.next(routeData);
}

export function goBackRoute(): void {
    const back: any = routeData.history.pop();
    if (routeData.history.length) {
        routeData.current = back;
        subjectRoute.next(routeData);
    }
}