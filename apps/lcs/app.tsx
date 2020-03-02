import * as React from 'react';
import LCSTable from './react/table';
import StringInput from './react/inputs/string-input';

const LCSApp: React.StatelessComponent<{}> = props => {
    return (
        <div>
            <StringInput dataName="first" />
            <StringInput dataName="second" />
            <LCSTable />
        </div>
    )
}

export default LCSApp;