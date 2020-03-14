import * as React from 'react';
import { CrnLocation } from '../classes/location';
import { connect } from 'react-redux';
import { CrnTableState } from '../redux/reducers';

interface ExternalProps {
    generateDataSet: (data: CrnLocation[]) => string[][];
    headers: string[];
}

interface StateToProps {
    data: CrnLocation[];
}

type TableProps = ExternalProps & StateToProps;

class TableComp extends React.Component<TableProps, {}> {
    render() {
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        {
                            this.props.headers.map(header => <th>{header}</th>)
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        this.props.generateDataSet(this.props.data).map(row => {
                            return (
                                <tr>
                                    {
                                        row.map(dat => <td>{dat}</td>)
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

const CoronaTable = connect<StateToProps, any, ExternalProps, CrnTableState>(state => {
    return {
        data: state.locations
    }
})(TableComp);

export default CoronaTable;