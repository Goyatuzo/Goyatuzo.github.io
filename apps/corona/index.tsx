import 'es6-promise';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux';
import HistoricContainer from './react/historic-container';

render(<Router>
    <Provider store={store}>
        <div className="ui container">
            <h1 className="ui header">Coronavirus</h1>
            <HistoricContainer />
        </div>
    </Provider>
</Router>, document.getElementById('corona-table-app'));