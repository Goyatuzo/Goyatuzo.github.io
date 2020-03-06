import { CrnLocation } from '../../classes/location';
import { CrnTableAction } from '../actions/actiontype';

export interface ICrnTableState {
    locations: CrnLocation[];
}

const defaultState: ICrnTableState = {
    locations: []
}

export function reducer(state = defaultState, action: CrnTableAction) {
    switch (action.type) {
        default:
            return state;
    }
}