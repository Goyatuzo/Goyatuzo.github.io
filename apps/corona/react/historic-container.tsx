import * as React from 'react';
import LocationDropdown from './location-dropdown';
import CoronaHistoricGraph from './historic-graph';
import { CrnLocation } from '../classes/location';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';

interface StateToProps {
    chosenLocation: string;
}

type HistoricContainerProps = StateToProps;

const HistoricContainerComp: React.StatelessComponent<HistoricContainerProps> = props => {
    const globalNumbers = (data: CrnLocation[]) => {
        const location = props.chosenLocation;

        let confirmed: { t: Date, y: number }[] = [];
        let deaths: { t: Date, y: number }[] = [];
        let recovered: { t: Date, y: number }[] = [];

        const datesInMs = Object.keys(data[0]?.statistics ?? {});
        for (let i = 0; i < data.length; ++i) {
            // If a location has been supplied in the query string, check if data is from relevant area.
            if (!location || (location === data[i].province || location === data[i].country)) {
                for (let j = 0; j < datesInMs.length; ++j) {
                    const stats = data[i].statistics[parseInt(datesInMs[j])];

                    // Add to confirmed
                    if (j >= confirmed.length) {
                        confirmed.push({ t: new Date(stats.dateInMs), y: stats.confirmed });
                    } else {
                        confirmed[j].y += stats.confirmed
                    }

                    // Add to deaths
                    if (j >= deaths.length) {
                        deaths.push({ t: new Date(stats.dateInMs), y: stats.deaths });
                    } else {
                        deaths[j].y += stats.deaths;
                    }

                    // Add to recovered
                    if (j >= recovered.length) {
                        recovered.push({ t: new Date(stats.dateInMs), y: stats.recovered });
                    } else {
                        recovered[j].y += stats.recovered;
                    }
                }
            }
        }

        return [{
            label: 'Confirmed',
            data: confirmed,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }, {
            label: 'Deaths',
            data: deaths,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }, {
            label: 'Recovered',
            data: recovered,
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 1
        }];
    }

    return (
        <div>
            <LocationDropdown />
            <CoronaHistoricGraph generateDataSet={globalNumbers} />
        </div>
    )
}

const HistoricContainer = connect<StateToProps, any, any, CrnTableState>(state => {
    return {
        chosenLocation: state.chosenLocation
    }
})(HistoricContainerComp);

export default HistoricContainer;