import * as React from 'react';
import LocationDropdown from './location-dropdown';
import CoronaHistoricGraph from './historic-graph';
import { CrnLocation, CrnStats } from '../classes/location';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';
import CoronaTable from './country-table';
import { CountryTableRow } from '../classes/table';

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

    const tableData = (data: CrnLocation[]): CountryTableRow[] => {
        let countryData: { [country: string]: CountryTableRow } = {};

        data.forEach(location => {
            const maxTime = Math.max(...Object.keys(location.statistics).map(ms => parseInt(ms)));
            if (location.country in countryData) {
                countryData[location.country].confirmed += location.statistics[maxTime].confirmed;
                countryData[location.country].recovered += location.statistics[maxTime].recovered;
                countryData[location.country].deaths += location.statistics[maxTime].deaths;
            } else {
                countryData[location.country] = {
                    countryName: location.country,
                    confirmed: location.statistics[maxTime].confirmed,
                    recovered: location.statistics[maxTime].recovered,
                    deaths: location.statistics[maxTime].deaths
                };
            }
        });

        let tableRows: CountryTableRow[] = Object.keys(countryData).map(key => countryData[key]);
        tableRows = tableRows.sort((a, b) => a.countryName.localeCompare(b.countryName));

        return tableRows;
    }


    return (
        <div>
            <LocationDropdown />
            <CoronaHistoricGraph generateDataSet={globalNumbers} />
            <CoronaTable headers={['Country', 'Confirmed', 'Recovered', 'Deaths']} generateDataSet={tableData} />
        </div>
    )
}

const HistoricContainer = connect<StateToProps, any, any, CrnTableState>(state => {
    return {
        chosenLocation: state.chosenLocation
    }
})(HistoricContainerComp);

export default HistoricContainer;