import * as React from 'react';
import { CrnLocation } from '../classes/location';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';
import { CountryTableRow } from '../classes/table';

interface ExternalProps {
    generateDataSet: (data: CrnLocation[]) => CountryTableRow[];
    headers: string[];
}

interface StateToProps {
    data: CrnLocation[];
}

type CountryTableProps = ExternalProps & StateToProps;

class CountryTableComp extends React.Component<CountryTableProps, {}> {
    render() {
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        {
                            this.props.headers.map(header => <th key={header}>{header}</th>)
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        this.props.generateDataSet(this.props.data).map(row => {
                            return (
                                <tr key={row.countryName}>
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

const CoronaCountryTable = connect<StateToProps, any, ExternalProps, CrnTableState>(state => {
    return {
        data: state.locations
    }
})(CountryTableComp);

export default CoronaCountryTable;