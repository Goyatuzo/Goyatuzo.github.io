import 'es6-promise';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux';
import CoronaHistoricGraph from './react/historic-graph';
import LocationDropdown from './react/location-dropdown';

render(<Router>
    <Provider store={store}>
        <div className="ui container">
            <h1 className="ui header">Coronavirus</h1>
            <LocationDropdown />
            <CoronaHistoricGraph />
        </div>
    </Provider>
</Router>, document.getElementById('corona-table-app'));