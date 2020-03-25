import { CrnTableState } from '../reducers';
import { CrnTableAction, CrnTableActionType } from './actiontype';
import { ThunkDispatch } from 'redux-thunk';
import { csv } from 'd3';

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
        value: value
    }
}

function requestRecoveredData(): CrnTableAction {
    return {
        type: CrnTableActionType.REQUEST_RECOVERED,
        value: null
    }
}

function storeRecoveredData(value): CrnTableAction {
    return {
        type: CrnTableActionType.STORE_RECOVERED,
        value: value
    }
}

function requestDeathsData(): CrnTableAction {
    return {
        type: CrnTableActionType.REQUEST_DEATHS,
        value: null
    }
}

function storeDeathsData(value): CrnTableAction {
    return {
        type: CrnTableActionType.STORE_DEATHS,
        value: value
    }
}

function fetchData(preFetchDispatch: () => CrnTableAction, storeDispatch: (value) => CrnTableAction, url: string) {
    return (dispatch: ThunkDispatch<any, any, CrnTableAction>, getState: () => CrnTableState) => {
        dispatch(preFetchDispatch());

        return csv(url).then(response => {
            dispatch(storeDispatch(response))
        }).catch(err => {
            console.error(err);
        });
    }
}

export function fetchConfirmedData() {
    return fetchData(requestConfirmedData, storeConfirmedData, `${rootUrl}time_series_covid19_confirmed_global.csv`);
}

export function fetchDeathsData() {
    return fetchData(requestDeathsData, storeDeathsData, `${rootUrl}time_series_covid19_deaths_global.csv`)
}


export function fetchAllData() {
    return (dispatch: ThunkDispatch<any, any, CrnTableAction>) => {
        dispatch(fetchConfirmedData());
        dispatch(fetchDeathsData());
    }
}

export function selectLocation(location: string): CrnTableAction {
    return {
        type: CrnTableActionType.SELECT_LOCATION,
        value: location
    }
}