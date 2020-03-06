import { CrnLocation } from '../../classes/location';
import { CrnTableAction } from '../actions/actiontype';

export interface CrnTableState {
    locations: CrnLocation[];
}

const defaultState: CrnTableState = {
    locations: []
}

export default function reducer(state = defaultState, action: CrnTableAction) {
    switch (action.type) {
        default:
            return state;
    }
}