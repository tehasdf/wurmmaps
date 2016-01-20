import maps from './reducers/maps';
import ui from './reducers/ui';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';


const logger = createLogger();


const rootReducer = combineReducers({
    maps,
    ui
});

const configureStore = initialState => {
    return applyMiddleware(
        thunkMiddleware,
        logger
    )(createStore)(rootReducer, initialState);
}

export default configureStore;
