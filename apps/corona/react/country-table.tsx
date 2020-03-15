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
    chosenLocation: string;
}

interface DispatchToProps {
    selectCountry: (country: string) => void;
}

type CountryTableProps = ExternalProps & StateToProps & DispatchToProps;

interface CountryTableState {
    tableRows: CountryTableRow[];
    sortTable: (a: CountryTableRow, b: CountryTableRow) => number;
    sortingColumn: SortColumn;
    sortReversed: boolean;
}

enum SortColumn {
    COUNTRY,
    CONFIRMED,
    RECOVERED,
    DEATH
}

class CountryTableComp extends React.Component<CountryTableProps, CountryTableState> {
    constructor(props: CountryTableProps) {
        super(props);

        this.state = {
            tableRows: [],
            sortTable: () => 0,
            sortingColumn: -1,
            sortReversed: false
        };
    }

    sortingHelper(column: SortColumn, sorting: (a: CountryTableRow, b: CountryTableRow) => number, reverse: (a: CountryTableRow, b: CountryTableRow) => number) {
        // If it's currently not sorted by column, it's basically resetting reversed
        if (this.state.sortingColumn !== column || (this.state.sortingColumn === column && this.state.sortReversed)) {
            this.setState({
                sortReversed: false,
                sortTable: sorting,
                sortingColumn: column
            });
        } else {
            this.setState({
                sortReversed: true,
                sortTable: reverse
            });
        }
    }

    sortCountryName = () => {
        this.sortingHelper(SortColumn.COUNTRY, (a, b) => a.countryName.localeCompare(b.countryName), (a, b) => b.countryName.localeCompare(a.countryName));
    }

    sortConfirmedNumber = (column: SortColumn, numberField: keyof CountryTableRow) => {
        return () => this.sortingHelper(column, (a, b) => (b[numberField] as number) - (a[numberField] as number), (a, b) => (a[numberField] as number) - (b[numberField] as number));
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

        tableRows = tableRows.sort(state.sortTable);

        return {
            tableRows
        }
    }

    renderCaret(column: SortColumn) {
        let className = 'caret down icon';

        if (this.state.sortReversed) {
            className += ' vertically flipped';
        }

        if (column === this.state.sortingColumn) {
            return <i className={className}></i>;
        }
    }

    render() {
        return (
            <div className="six wide column">
                <table className="ui selectable compact celled table">
                    <thead>
                        <tr>
                            <th onClick={this.sortCountryName}>
                                Country Name
                            {
                                    this.renderCaret(SortColumn.COUNTRY)
                                }
                            </th>
                            <th onClick={this.sortConfirmedNumber(SortColumn.CONFIRMED, "confirmed")}>
                                Confirmed
                            {
                                    this.renderCaret(SortColumn.CONFIRMED)
                                }
                            </th>
                            <th onClick={this.sortConfirmedNumber(SortColumn.RECOVERED, "recovered")}>
                                Recovered
                            {
                                    this.renderCaret(SortColumn.RECOVERED)
                                }
                            </th>
                            <th onClick={this.sortConfirmedNumber(SortColumn.DEATH, "deaths")}>
                                Deaths
                            {
                                    this.renderCaret(SortColumn.DEATH)
                                }
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.tableRows.map(row => {
                                return (
                                    <tr key={row.countryName} onClick={this.countrySelected(row.countryName)} className={row.countryName === this.props.chosenLocation ? "blue" : ""}>
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
            </div>
        )
    }
}

const CoronaCountryTable = connect<StateToProps, DispatchToProps, ExternalProps, CrnTableState>(state => {
    return {
        data: state.locations,
        chosenLocation: state.chosenLocation
    }
}, (dispatch) => {
    return {
        selectCountry: (country: string) => dispatch(selectLocation(country))
    }
})(CountryTableComp);

export default CoronaCountryTable;