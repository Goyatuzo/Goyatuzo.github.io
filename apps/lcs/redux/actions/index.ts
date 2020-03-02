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

export function updateFirstString(str: string): LCSAction {
    return {
        type: LCSActionType.SET_STRING_ONE,
        value: str
    }
}

export function updateSecondString(str: string): LCSAction {
    return {
        type: LCSActionType.SET_STRING_TWO,
        value: str
    }
}