import { CrnLocation, CrnStats } from '../../classes/location';
import { CrnTableAction, CrnTableActionType } from '../actions/actiontype';

export interface CrnTableState {
    requestingConfirmed: boolean;
    locations: CrnLocation[];
}

const defaultState: CrnTableState = {
    requestingConfirmed: false,
    locations: []
}

function updateField(locations: CrnLocation[], data: string[][], fieldToUpdate: keyof CrnStats): CrnLocation[] {
    let updatedState: CrnLocation[] = JSON.parse(JSON.stringify(locations));

    if (locations.length === 0) {
        for (let i = 1; i < data.length; ++i) {
            const row = data[i];

            let newLocation: CrnLocation = {
                province: row[0],
                country: row[1],
                lat: parseInt(row[2]),
                long: parseInt(row[3]),
                statistics: {}
            };

            for (let j = 4; j < data[i].length; ++j) {
                const dateTokens = data[0][j].split('/').map(tkn => parseInt(tkn));

                const date = new Date(parseInt(`20${dateTokens[2]}`), dateTokens[0] - 1, dateTokens[1]);
                if (!newLocation.statistics[date.getTime()]) {
                    newLocation.statistics[date.getTime()] = {
                        dateInMs: date.getTime(),
                        deaths: 0,
                        confirmed: 0,
                        recovered: 0
                    }
                }
                newLocation.statistics[date.getTime()][fieldToUpdate] = parseInt(data[i][j]);
            }
            console.log(newLocation);
        }
    }


    return updatedState;
}

export default function reducer(state = defaultState, action: CrnTableAction) {
    switch (action.type) {
        case CrnTableActionType.REQUEST_CONFIRMED: {
            return { ...state, requestingConfirmed: true };
        }
        case CrnTableActionType.STORE_CONFIRMED: {
            console.log(updateField(state.locations, action.value, "confirmed"));

            return { ...state, locations: updateField(state.locations, action.value, "confirmed") };
        }
        default:
            return state;
    }
}