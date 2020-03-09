import axios, { AxiosError } from 'axios';
import { CrnTableState } from '../reducers';
import { CrnTableAction, CrnTableActionType } from './actiontype';
import { ThunkDispatch } from 'redux-thunk';
import csvToJson = require('csvtojson');

const rootUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/';

function requestConfirmedData(): CrnTableAction {
    return {
        type: CrnTableActionType.REQUEST_CONFIRMED,
        value: null
    }
}

function storeConfirmedData(value, headers: string[]): CrnTableAction {
    return {
        type: CrnTableActionType.STORE_CONFIRMED,
        value: {
            value,
            headers
        }
    }
}

export function fetchConfirmedData() {
    return (dispatch: ThunkDispatch<any, any, CrnTableAction>, getState: () => CrnTableState) => {
        dispatch(requestConfirmedData());

        return axios.get<string>(`${rootUrl}time_series_19-covid-Confirmed.csv`).then(response => {
            // const datas = response.data.split('\n');

            csvToJson({ output: 'csv' }).fromString(response.data).then(data => {
                let headers = response.data.split('\n')[0].split(',');

                dispatch(storeConfirmedData(data, headers));
            });


        }).catch(err => {
            console.error(err);
        });
    }
}