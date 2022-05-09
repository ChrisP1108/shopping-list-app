import { BehaviorSubject, Observable } from 'rxjs';

interface dataInterface {
    user: { 
        _id: string,
        username: string,
        firstName: string,
        email: string,
        settings: {
            themeColor: string,
            sortBy: string,
            showChecked: boolean
        }
        savedShoppingLists: Array,
        
}

const subjectData: Observable<dataInterface> = new BehaviorSubject(null);

export function getData() {
    return subjectData;
}

export function setData(value: any) {
    return subjectData.next(value)
}