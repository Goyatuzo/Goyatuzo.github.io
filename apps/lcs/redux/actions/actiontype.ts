import { Action } from 'redux';

export enum LCSActionType {
    SET_STRING_ONE,
    SET_STRING_TWO,
    CALCULATE,
    CALCULATE_SEQUENCE
}

export interface LCSAction<T = any> extends Action<LCSActionType> {
    value: T;
}