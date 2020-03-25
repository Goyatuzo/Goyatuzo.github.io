import * as React from 'react';
import { connect } from 'react-redux';
import { } from 'd3'

import { CrnLocation } from '../classes/location';
import { CrnTableState } from '../redux/reducers';
import { OverallGraphEntry, NormalizedGraphEntry, GlobalChangeLineGraphData } from '../classes/graph';
import GlobalOverallGraph from './global-overall-graph';
import ConfirmedNormalizedArea from './confirmed-normalized-line';
import GlobalChangeLineGraph from './global-change-line-graph';

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

    const rateOfChange = (data: CrnLocation[]): GlobalChangeLineGraphData => {
        const dates = Object.keys(data[0]?.statistics ?? {}).map(dateInMs => new Date(parseInt(dateInMs)));
        
        return {
            dates,
            data: []
        }
    }


    return (
        <div className="ui grid">
            <h2 className="ui center aligned header">Global Daily Rate of Change</h2>
            <GlobalChangeLineGraph generateDataSet={rateOfChange} />
            <h2 className="ui center aligned header">Global Numbers</h2>
            <GlobalOverallGraph generateDataSet={globalNumbers} />
            <h2 className="ui center aligned header">Normalized Confirmed Cases by Country</h2>
            <ConfirmedNormalizedArea generateDataSet={normalizedCountryNumbers} />
        </div>
    )
}

const HistoricContainer = connect<StateToProps, any, any, CrnTableState>(state => {
    return {
        chosenLocation: state.chosenLocation
    }
})(HistoricContainerComp);

export default HistoricContainer;