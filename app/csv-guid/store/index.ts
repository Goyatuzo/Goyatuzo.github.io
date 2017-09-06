import { createStore } from 'redux';
import { ICsvGuidStore } from '../../classes/csv-guid';

let initial: ICsvGuidStore = {};

let store = createStore(initial, 