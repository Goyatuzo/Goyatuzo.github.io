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

            // Initialize column and row to 0 for base cases
            for (let i = 0; i < state.stringTwo.length + 1; ++i) {
                table[i] = {
                    0: {
                        length: 0,
                        direction: LCSDirection.LEFT
                    }
                };
            }

            for (let i = 0; i < state.stringOne.length + 1; ++i) {
                table[0][i] = {
                    length: 0,
                    direction: LCSDirection.UP
                }
            }

            for (let i = 1; i < state.stringTwo.length + 1; ++i) {
                for (let j = 1; j < state.stringOne.length + 1; ++j) {
                    if (state.stringOne[j - 1] === state.stringTwo[i - 1]) {
                        table[i][j] = {
                            length: table[i - 1][j - 1].length + 1,
                            direction: LCSDirection.DIAG
                        }
                    } else {
                        const topCell = table[i - 1][j];
                        const leftCell = table[i][j - 1];

                        const bigger = Math.max(topCell.length, leftCell.length);

                        if (bigger === leftCell.length) {
                            table[i][j] = { ...leftCell };
                            table[i][j].direction = LCSDirection.LEFT;
                        } else {
                            table[i][j] = { ...topCell };
                            table[i][j].direction = LCSDirection.UP;
                        }
                    }
                }
            }

            return { ...state, error: null, cells: table };

        default:
            return state;
    }
}