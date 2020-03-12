import { CrnLocation, CrnStats } from '../../classes/location';
import { CrnTableAction, CrnTableActionType } from '../actions/actiontype';

export interface CrnTableState {
    requestingConfirmed: boolean;
    requestingDeaths: boolean;
    requestingRecovered: boolean;
    chosenLocation: string;
    locations: CrnLocation[];
}

const defaultState: CrnTableState = {
    requestingConfirmed: false,
    requestingDeaths: false,
    requestingRecovered: false,
    chosenLocation: null,
    locations: []
}

function updateField(locations: CrnLocation[], data: string[][], headers: string[], fieldToUpdate: keyof CrnStats): CrnLocation[] {
    let updatedLocations: CrnLocation[] = JSON.parse(JSON.stringify(locations));

    for (let i = 0; i < data.length; ++i) {
        const row = data[i];

        let newLocation: CrnLocation = updatedLocations[i] ?? {
            province: row[0],
            country: row[1],
            lat: parseInt(row[2]),
            long: parseInt(row[3]),
            statistics: {}
        };

        for (let j = 4; j < data[i].length; ++j) {
            const dateTokens = headers[j].split('/').map(tkn => parseInt(tkn));

            const date = new Date(parseInt(`20${dateTokens[2]}`), dateTokens[0] - 1, dateTokens[1]);
            if (!newLocation.statistics[date.getTime()]) {
                newLocation.statistics[date.getTime()] = {
                    dateInMs: date.getTime(),
                    deaths: 0,
                    confirmed: 0,
                    recovered: 0
                }
            }
            newLocation.statistics[date.getTime()][fieldToUpdate] = parseInt(data[i][j] ?? '0');
        }

        if (i >= updatedLocations.length) {
            updatedLocations.push(newLocation);
        }
    }

    return updatedLocations;
}

export default function reducer(state = defaultState, action: CrnTableAction) {
    switch (action.type) {
        case CrnTableActionType.REQUEST_CONFIRMED: {
            return { ...state, requestingConfirmed: true };
        }
        case CrnTableActionType.REQUEST_DEATHS: {
            return { ...state, requestingDeaths: true };
        }
        case CrnTableActionType.REQUEST_RECOVERED: {
            return { ...state, requestingRecovered: true };
        }
        case CrnTableActionType.STORE_CONFIRMED: {
            return { ...state, requestingConfirmed: false, locations: updateField(state.locations, action.value.value, action.value.headers, "confirmed") };
        }
        case CrnTableActionType.STORE_DEATHS: {
            return { ...state, requestingDeaths: false, locations: updateField(state.locations, action.value.value, action.value.headers, "deaths") };
        }
        case CrnTableActionType.STORE_RECOVERED: {
            return { ...state, requestingRecovered: false, locations: updateField(state.locations, action.value.value, action.value.headers, "recovered") };
        }
        case CrnTableActionType.SELECT_LOCATION: {
            return { ...state, chosenLocation: action.value };
        }
        default:
            return state;
    }
}