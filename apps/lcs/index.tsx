import * as React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './redux/reducers';
import LCSApp from './app';

const store = createStore(reducer);

render(<Provider store={store}><LCSApp /></Provider>, document.getElementById('lcs-app'));