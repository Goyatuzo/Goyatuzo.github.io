import axios from 'axios';
import { CrnTableState } from '../reducers';
import { CrnTableAction, CrnTableActionType } from './actiontype';
import { ThunkDispatch } from 'redux-thunk';
import { CrnLocation } from '../../classes/location';

const rootUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/';

function requestConfirmedData(): CrnTableAction {
    return {
        type: CrnTableActionType.REQUEST_CONFIRMED,
        value: null
    }
}

function storeConfirmedData(value): CrnTableAction {
    return {
        type: CrnTableActionType.STORE_CONFIRMED,
        value
    }
}

export function fetchConfirmedData() {
    return (dispatch: ThunkDispatch<any, any, CrnTableAction>, getState: () => CrnTableState) => {
        dispatch(requestConfirmedData());

        return axios.get<string>(`${rootUrl}time_series_19-covid-Confirmed.csv`).then(response => {
            const datas = response.data.split('\n');

            let stored = [];

            for (let i = 0; i < datas.length; ++i) {
                stored.push(datas[i].split(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\"\\" + strDelimiter + "\\r\\n]*))/gi));
            }

            dispatch(storeConfirmedData(stored));
        });
    }
}