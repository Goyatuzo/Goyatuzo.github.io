import * as React from 'react';
import { connect } from 'react-redux';
import { } from 'd3'

import LocationDropdown from './location-dropdown';
import { CrnLocation, CrnStats } from '../classes/location';
import { CrnTableState } from '../redux/reducers';
import CoronaTable from './country-table';
import { CountryTableRow } from '../classes/table';
import { OverallGraphEntry, NormalizedGraphEntry } from '../classes/graph';
import ConfirmedNormalizedAreaChart from './confirmed-normalized-line';
import GlobalOverallGraph from './global-overall-graph';

interface StateToProps {
    chosenLocation: string;
}

type HistoricContainerProps = StateToProps;

const HistoricContainerComp: React.StatelessComponent<HistoricContainerProps> = props => {
    const globalNumbers = (data: CrnLocation[]): OverallGraphEntry[] => {
        const location = props.chosenLocation;

        let uniqueEntries: { [dateInMs: number]: OverallGraphEntry } = {}

        const datesInMs = Object.keys(data[0]?.statistics ?? {});
        for (let i = 0; i < data.length; ++i) {
            // If a location has been supplied in the query string, check if data is from relevant area.
            if (!location || (location === data[i].province || location === data[i].country)) {
                for (let j = 0; j < datesInMs.length; ++j) {
                    const stats = data[i].statistics[parseInt(datesInMs[j])];

                    if (stats.dateInMs in uniqueEntries) {
                        uniqueEntries[stats.dateInMs].confirmed += (stats.confirmed - stats.deaths - stats.recovered);
                        uniqueEntries[stats.dateInMs].deaths += stats.deaths;
                        uniqueEntries[stats.dateInMs].recovered += stats.recovered;
                    } else {
                        uniqueEntries[stats.dateInMs] = {
                            date: new Date(stats.dateInMs),
                            confirmed: (stats.confirmed - stats.deaths - stats.recovered),
                            deaths: stats.deaths,
                            recovered: stats.recovered
                        }
                    }
                }
            }
        }

        const entries = Object.keys(uniqueEntries).map(key => uniqueEntries[key]);

        return entries;
    }

    const normalizedCountryNumbers = (data: CrnLocation[]): NormalizedGraphEntry[] => {
        let uniqueEntries: { [dateInMs: number]: NormalizedGraphEntry } = {}

        const datesInMs = Object.keys(data[0]?.statistics ?? {});
        for (let i = 0; i < data.length; ++i) {
            for (let j = 0; j < datesInMs.length; ++j) {
                const stats = data[i].statistics[parseInt(datesInMs[j])];

                if (stats.dateInMs in uniqueEntries && data[i].country in uniqueEntries[stats.dateInMs]) {
                    uniqueEntries[stats.dateInMs][data[i].country] += stats.confirmed;
                } else if (stats.dateInMs in uniqueEntries && !(data[i].country in uniqueEntries[stats.dateInMs])) {
                    uniqueEntries[stats.dateInMs][data[i].country] = stats.confirmed;
                } else {
                    uniqueEntries[stats.dateInMs] = {
                        date: new Date(stats.dateInMs),
                        [data[i].country]: stats.confirmed
                    }
                }
            }
        }

        const entries = Object.keys(uniqueEntries).map(key => uniqueEntries[key]);

        return entries;
    }


    return (
        <div className="ui grid">
            <h2 className="ui center aligned header">Global Numbers</h2>
            <GlobalOverallGraph generateDataSet={globalNumbers} />
            <h2 className="ui center aligned header">Normalized Confirmed Cases by Country</h2>
            <ConfirmedNormalizedAreaChart generateDataSet={normalizedCountryNumbers} />
        </div>
    )
}

const HistoricContainer = connect<StateToProps, any, any, CrnTableState>(state => {
    return {
        chosenLocation: state.chosenLocation
    }
})(HistoricContainerComp);

export default HistoricContainer;