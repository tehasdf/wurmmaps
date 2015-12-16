import rootReducer from './reducers';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';


const logger = createLogger();


const configureStore = initialState => {
    return applyMiddleware(
        thunkMiddleware,
        logger
    )(createStore)(rootReducer, initialState);
}

export default configureStore;
