import { LCSAction, LCSActionType } from './actiontype';

export function calculate(): LCSAction {
    return {
        type: LCSActionType.CALCULATE,
        value: null
    }
}

export function calculateSubsequence(): LCSAction {
    return {
        type: LCSActionType.CALCULATE_SEQUENCE,
        value: null
    }
}