import { BehaviorSubject } from 'rxjs';

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
        savedShoppingLists: Array<any>,
        activeShoppingLists: Array<any>
    }
}

const subjectData: BehaviorSubject<any> = new BehaviorSubject(null);

export function getData() {
    return subjectData;
}

export function setData(value: dataInterface) {
    subjectData.next(value)
}