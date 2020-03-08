import { Action } from 'redux';

export enum CrnTableActionType {
    REQUEST_CONFIRMED,
    STORE_CONFIRMED
}

export interface CrnTableAction<T = any> extends Action<CrnTableActionType> {
    value: T;
}