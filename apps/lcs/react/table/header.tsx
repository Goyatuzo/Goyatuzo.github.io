import * as React from 'react';
import { LCSState } from '../../redux/reducers';
import { connect } from 'react-redux';

interface StateToProps {
    headerString: string;
}

const LCSTableHeaderView: React.StatelessComponent<StateToProps> = props => {
    return (
        <thead>
            <tr>
                <th></th>
                <th></th>
                {
                    props.headerString.split('').map((char, idx) => <td key={idx}>{char}</td>)
                }
            </tr>
        </thead>
    )
}

function mapStateToProps(state: LCSState): StateToProps {
    return {
        headerString: state.stringOne
    };
}

const LCSTableHeader = connect(mapStateToProps)(LCSTableHeaderView);

export default LCSTableHeader;