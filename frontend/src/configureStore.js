import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'

import maps from './reducers/maps';
import ui from './reducers/ui';

const logger = createLogger();

const rootReducer = combineReducers({
    maps,
    ui,
    routing: routeReducer
});

const reduxRouterMiddleware = syncHistory(browserHistory);

const configureStore = initialState => {
    return applyMiddleware(
        reduxRouterMiddleware,
        thunkMiddleware,
        logger,
    )(createStore)(rootReducer, initialState);
}

export default configureStore;
