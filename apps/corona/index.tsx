
import 'es6-promise';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux';
import CoronaHistoricGraph from './react/historic-graph';

render(<Provider store={store}>
    <CoronaHistoricGraph />
</Provider>, document.getElementById('corona-table-app'));