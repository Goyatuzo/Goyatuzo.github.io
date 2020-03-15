import * as React from 'react';
import { CrnLocation } from '../classes/location';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';
import { CountryTableRow } from '../classes/table';
import { selectLocation } from '../redux/actions';

interface ExternalProps {
}

interface StateToProps {
    data: CrnLocation[];
}

interface DispatchToProps {
    selectCountry: (country: string) => void;
}

type CountryTableProps = ExternalProps & StateToProps & DispatchToProps;

interface CountryTableState {
    tableRows: CountryTableRow[];
}

class CountryTableComp extends React.Component<CountryTableProps, CountryTableState> {
    constructor(props: CountryTableProps) {
        super(props);

        this.state = {
            tableRows: []
        };
    }

    countrySelected = (country: string) => {
        return (_: React.MouseEvent<HTMLTableRowElement>) => {
            return this.props.selectCountry(country ?? null)
        }
    }

    static getDerivedStateFromProps(props: CountryTableProps, state: CountryTableState) {
        let countryData: { [country: string]: CountryTableRow } = {};

        props.data.forEach(location => {
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

        // if (sortFunc) {
        //     tableRows = tableRows.sort((a, b) => a.countryName.localeCompare(b.countryName));
        // }

        return {
            tableRows
        }
    }

    render() {
        return (
            <table className="ui selectable celled table">
                <thead>
                    <tr>
                        <th>Country Name</th>
                        <th>Confirmed</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        this.state.tableRows.map(row => {
                            return (
                                <tr key={row.countryName} onClick={this.countrySelected(row.countryName)}>
                                    <td>{row.countryName}</td>
                                    <td>{row.confirmed}</td>
                                    <td>{row.recovered}</td>
                                    <td>{row.deaths}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

const CoronaCountryTable = connect<StateToProps, DispatchToProps, ExternalProps, CrnTableState>(state => {
    return {
        data: state.locations
    }
}, (dispatch) => {
    return {
        selectCountry: (country: string) => dispatch(selectLocation(country))
    }
})(CountryTableComp);

export default CoronaCountryTable;