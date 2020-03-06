import { CrnTableState } from '../reducers'
import { DispatchProp } from 'react-redux';
import { CrnTableAction, CrnTableActionType } from './actiontype';

function storeConfirmedData(value): CrnTableAction {
    return {
        type: CrnTableActionType.STORE_CONFIRMED,
        value
    }
}

export function fetchConfirmedData() {
    return (dispatch: DispatchProp<CrnTableAction>, getState: () => CrnTableState) => {
        
    }
}