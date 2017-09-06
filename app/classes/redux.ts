export enum IActionType {
    STORE_CSV
}

export interface IAction<T> {
    type: IActionType;
    value: T;
}