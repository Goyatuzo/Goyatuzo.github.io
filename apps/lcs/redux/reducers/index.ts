import { LCSAction, LCSActionType } from '../actions/actiontype';
import { LCSDPCell } from '../classes/dp-cell';

export interface LCSState {
    stringOne: string;
    stringTwo: string;

    cells: { [row: number]: { [column: number]: LCSDPCell } };
}

export default function reducer(state: LCSState = null, action: LCSAction) {
    switch (action.type) {
        case LCSActionType.SET_STRING_ONE:
            return { ...state, stringOne: action.value };

        case LCSActionType.SET_STRING_TWO:
            return { ...state, stringTwo: action.value };

        default:
            return state;
    }
}