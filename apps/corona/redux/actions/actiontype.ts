import { Action } from 'redux';

export enum CrnTableActionType {
    REQUEST_CONFIRMED,
    STORE_CONFIRMED,
    REQUEST_DEATHS,
    STORE_DEATHS,
    REQUEST_RECOVERED,
    STORE_RECOVERED
}

export interface CrnTableAction<T = any> extends Action<CrnTableActionType> {
    value: T;
}