import * as React from 'react';
import LCSTable from './react/table';
import StringInput from './react/inputs/string-input';

const LCSApp: React.StatelessComponent<{}> = props => {
    return (
        <div className="ui container">
            <div className="ui segments">
                <div className="ui segment">
                    <a className="ui labeled icon button" href="/">
                        <i className="left chevron icon"></i>
                        Home
                    </a>
                    <div className="ui two column very relaxed stackable grid">
                        <div className="right aligned column">
                            <StringInput dataName="first" />
                        </div>
                        <div className="column">
                            <StringInput dataName="second" />
                        </div>
                    </div>

                    <div className="ui vertical divider">and</div>
                </div>
                <LCSTable />
            </div>
        </div>
    )
}

export default LCSApp;