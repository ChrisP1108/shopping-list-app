import { PureComponent } from 'react';
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
        activeShoppingLists?: Array<activeShoppingListInterface>,
        savedShoppingLists: Array<savedShoppingListInterface>
    }
}

interface activeShoppingListInterface {
    _id: string,
    user: string,
    activeShoppingList: string,
    __v?: string,
    createdAt: string,
    updatedAt: string
}

interface savedShoppingListInterface {
    _id: string,
    user: string,
    name: string,
    items: Array<savedShoppingListItemInterface>,
    __v?: string,
    createdAt: string,
    updatedAt: string
}

interface savedShoppingListItemInterface {
    _id: string,
    name: string,
    quantity: number,
    category: string,
    description: string,
    checked: boolean
}

const subjectData: BehaviorSubject<any> = new BehaviorSubject(null);

export function getData(): BehaviorSubject<dataInterface> {
    return subjectData;
}

export function setData(value: dataInterface): void {
    subjectData.next(value)
}