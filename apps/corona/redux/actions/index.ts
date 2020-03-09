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

function requestRecoveredData(): CrnTableAction {
    return {
        type: CrnTableActionType.REQUEST_RECOVERED,
        value: null
    }
}

function storeRecoveredData(value, headers: string[]): CrnTableAction {
    return {
        type: CrnTableActionType.STORE_RECOVERED,
        value: {
            value,
            headers
        }
    }
}

function requestDeathsData(): CrnTableAction {
    return {
        type: CrnTableActionType.REQUEST_DEATHS,
        value: null
    }
}

function storeDeathsData(value, headers: string[]): CrnTableAction {
    return {
        type: CrnTableActionType.STORE_DEATHS,
        value: {
            value,
            headers
        }
    }
}

function fetchData(preFetchDispatch: () => CrnTableAction, storeDispatch: (value, headers: string[]) => CrnTableAction, url: string) {
    return (dispatch: ThunkDispatch<any, any, CrnTableAction>, getState: () => CrnTableState) => {
        dispatch(preFetchDispatch());

        return axios.get<string>(url).then(response => {
            // const datas = response.data.split('\n');

            csvToJson({ output: 'csv' }).fromString(response.data).then(data => {
                let headers = response.data.split('\n')[0].split(',');

                dispatch(storeDispatch(data, headers));
            });
        }).catch(err => {
            console.error(err);
        });
    }
}

export function fetchConfirmedData() {
    return fetchData(requestConfirmedData, storeConfirmedData, `${rootUrl}time_series_19-covid-Confirmed.csv`);
}

export function fetchDeathsData() {
    return fetchData(requestDeathsData, storeDeathsData, `${rootUrl}time_series_19-covid-Deaths.csv`)
}

export function fetchRecoveredData() {
    return fetchData(requestDeathsData, storeDeathsData, `${rootUrl}time_series_19-covid-Recovered.csv`)
}

export function fetchAllData() {
    return (dispatch: ThunkDispatch<any, any, CrnTableAction>) => {
        dispatch(fetchConfirmedData());
        dispatch(fetchDeathsData());
        dispatch(fetchRecoveredData());
    }
}