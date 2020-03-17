import * as React from 'react';
import LocationDropdown from './location-dropdown';
import CoronaHistoricGraph from './historic-graph';
import { CrnLocation, CrnStats } from '../classes/location';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';
import CoronaTable from './country-table';
import { CountryTableRow } from '../classes/table';
import { OverallGraphEntry } from '../classes/graph';

interface StateToProps {
    chosenLocation: string;
}

type HistoricContainerProps = StateToProps;

const HistoricContainerComp: React.StatelessComponent<HistoricContainerProps> = props => {
    const globalNumbers = (data: CrnLocation[]): OverallGraphEntry[] => {
        const location = props.chosenLocation;

        let entries: OverallGraphEntry[] = [];

        const datesInMs = Object.keys(data[0]?.statistics ?? {});
        for (let i = 0; i < data.length; ++i) {
            // If a location has been supplied in the query string, check if data is from relevant area.
            if (!location || (location === data[i].province || location === data[i].country)) {
                for (let j = 0; j < datesInMs.length; ++j) {
                    const stats = data[i].statistics[parseInt(datesInMs[j])];

                    entries.push({
                        date: new Date(stats.dateInMs),
                        confirmed: stats.confirmed,
                        deaths: stats.deaths,
                        recovered: stats.recovered
                    });
                }
            }
        }

        return entries;
    }


    return (
        <div className="ui grid">
            <CoronaHistoricGraph generateDataSet={globalNumbers} />
            <CoronaTable />
        </div>
    )
}

const HistoricContainer = connect<StateToProps, any, any, CrnTableState>(state => {
    return {
        chosenLocation: state.chosenLocation
    }
})(HistoricContainerComp);

export default HistoricContainer;