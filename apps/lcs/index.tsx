import * as React from 'react';
import { render } from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './redux/reducers';
import LCSApp from './app';
import { calculate } from './redux/actions';

const store = createStore(reducer);

store.dispatch(calculate());

render(<Provider store={store}><LCSApp /></Provider>, document.getElementById('lcs-app'));