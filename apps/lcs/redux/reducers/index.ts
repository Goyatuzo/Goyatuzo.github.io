import { LCSAction, LCSActionType } from '../actions/actiontype';
import { LCSDPCell, LCSDirection } from '../classes/dp-cell';
import { LCSTable } from '../classes/table';


export interface LCSState {
    stringOne: string;
    stringTwo: string;
    error: any;

    cells: LCSTable;
}

const defaultState: LCSState = {
    stringOne: 'ACTVBD',
    stringTwo: 'REWACTD',
    error: null,
    cells: null
}

export default function reducer(state: LCSState = defaultState, action: LCSAction) {
    switch (action.type) {
        case LCSActionType.SET_STRING_ONE:
            return { ...state, stringOne: action.value };

        case LCSActionType.SET_STRING_TWO:
            return { ...state, stringTwo: action.value };

        case LCSActionType.CALCULATE:
            if (!state.stringOne || !state.stringTwo) {
                return { ...state, error: "Neither string should be empty." };
            }

            let table: LCSTable = {};

            for (let i = 0; i < state.stringOne.length + 1; ++i) {
                for (let j = 0; j < state.stringTwo.length + 1; ++j) {
                    if (!table[i]) {
                        table[i] = {};
                    }

                    if (i == 0 || j == 0) {
                        table[i][j] = {
                            length: 0,
                            direction: LCSDirection.UP
                        }
                    } else if (state.stringOne[i] === state.stringTwo[j]) {
                        table[i][j] = table[i - 1][j - 1];
                    } else {
                        const bigger = Math.max(table[i - 1][j].length, table[i][j - 1].length);

                        if (bigger === table[i][j - 1].length) {
                            table[i][j] = table[i][j - 1];
                            table[i][j].direction = LCSDirection.UP;
                        } else {
                            table[i][j] = table[i - 1][j];
                            table[i][j].direction = LCSDirection.LEFT;
                        }
                    }
                }
            }

            return { ...state, error: null, cells: table };

        default:
            return state;
    }
}