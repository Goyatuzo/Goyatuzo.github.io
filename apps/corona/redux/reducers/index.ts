import { CrnLocation, CrnStats } from '../../classes/location';
import { CrnTableAction, CrnTableActionType } from '../actions/actiontype';
import { DSVRowArray } from 'd3';

export interface CrnTableState {
    requestingConfirmed: boolean;
    requestingDeaths: boolean;
    requestingRecovered: boolean;
    chosenLocation: string;
    locations: CrnLocation[];
    unparsedData: DSVRowArray;
}

const defaultState: CrnTableState = {
    requestingConfirmed: false,
    requestingDeaths: false,
    requestingRecovered: false,
    chosenLocation: null,
    locations: [],
    unparsedData: null
}

function updateField(locations: CrnLocation[], data: DSVRowArray, fieldToUpdate: keyof CrnStats): CrnLocation[] {
    let updatedLocations: CrnLocation[] = JSON.parse(JSON.stringify(locations));
    const headers = data.columns;

    for (let i = 0; i < data.length; ++i) {
        const row = data[i];

        let newLocation: CrnLocation = updatedLocations[i] ?? {
            province: row[headers[0]],
            country: row[headers[1]],
            lat: parseInt(row[headers[2]]),
            long: parseInt(row[headers[3]]),
            statistics: {}
        };

        for (let j = 4; j < headers.length; ++j) {
            const dateTokens = headers[j].split('/').map(tkn => parseInt(tkn));

            const date = new Date(parseInt(`20${dateTokens[2]}`), dateTokens[0] - 1, dateTokens[1]);
            if (!newLocation.statistics[date.getTime()] && data[i][headers[j]] !== "") {
                newLocation.statistics[date.getTime()] = {
                    dateInMs: date.getTime(),
                    deaths: 0,
                    confirmed: 0,
                    recovered: 0
                }
            }

            if (newLocation.statistics[date.getTime()] && data[i][headers[j]] !== "") {
                newLocation.statistics[date.getTime()][fieldToUpdate] = parseInt(data[i][headers[j]] ?? '0') || 0;
            }
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
            return { ...state, requestingConfirmed: false, locations: updateField(state.locations, action.value, "confirmed") };
        }
        case CrnTableActionType.STORE_DEATHS: {
            return { ...state, requestingDeaths: false, locations: updateField(state.locations, action.value, "deaths") };
        }
        case CrnTableActionType.STORE_RECOVERED: {
            return { ...state, requestingRecovered: false, locations: updateField(state.locations, action.value, "recovered") };
        }
        case CrnTableActionType.SELECT_LOCATION: {
            return { ...state, chosenLocation: action.value };
        }
        default:
            return state;
    }
}