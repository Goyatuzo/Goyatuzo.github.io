import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { fetchAllData } from './actions'

const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(fetchAllData() as any);

export default store;