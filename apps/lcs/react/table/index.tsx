import * as React from 'react';
import { connect } from 'react-redux';
import LCSTableHeader from './header';
import LCSTableRow from './row';
import { LCSTable } from '../../redux/classes/table';
import { LCSState } from '../../redux/reducers';

interface LCSTableProps {
    table: LCSTable;
    secondString: string;
}

const LCSTableView: React.StatelessComponent<LCSTableProps> = props => {
    return (
        <table className="ui celled table">
            <LCSTableHeader />
            <tbody>
                {
                    Object.keys(props.table).map(key => key === '0' ? <LCSTableRow key={key} char={""} values={props.table[key]} /> : <LCSTableRow key={key} char={props.secondString[parseInt(key) - 1]} values={props.table[key]} />)
                }
            </tbody>
        </table>
    )
}

function mapStateToProps(state: LCSState): LCSTableProps {
    return {
        table: state.cells,
        secondString: state.stringTwo
    }
}

const LCSTable = connect(mapStateToProps)(LCSTableView);

export default LCSTable