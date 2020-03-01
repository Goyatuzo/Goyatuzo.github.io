import { LCSAction, LCSActionType } from './actiontype';

export function calculate(): LCSAction {
    return {
        type: LCSActionType.CALCULATE,
        value: null
    }
}