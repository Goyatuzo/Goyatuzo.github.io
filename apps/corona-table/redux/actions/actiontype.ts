import { Action } from 'redux';

export enum CrnTableActionType {
    STORE_DATA
}

export interface CrnTableAction<T = any> extends Action<CrnTableActionType> {
    value: T;
}