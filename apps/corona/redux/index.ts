import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { fetchConfirmedData } from './actions'

const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(fetchConfirmedData() as any);

export default store;