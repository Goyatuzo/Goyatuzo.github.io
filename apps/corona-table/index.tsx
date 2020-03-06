import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux';

render(<Provider store={store}>
    <div>TEST</div>
</Provider>, document.getElementById('corona-table-app'));