import * as React from 'react';
import { LCSState } from '../../redux/reducers';
import { connect } from 'react-redux';
import LCSTableHeader from './header';


const LCSTableView: React.StatelessComponent<LCSState> = props => {
    return (
        <table className="ui celled table">
            <LCSTableHeader />
        </table>
    )
}

function mapStateToProps(state: LCSState) {
    return state;
}

const LCSTable = connect(mapStateToProps)(LCSTableView);

export default LCSTable