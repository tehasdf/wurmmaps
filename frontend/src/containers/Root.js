import React from 'react';

import {Provider} from 'react-redux';
import configureStore from '../configureStore';
import { Router, Route, browserHistory, IndexRoute} from 'react-router'

import App from './App';
import Map from '../containers/Map';
import MapList from '../components/MapList';

const store = configureStore();



const Root = props => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path={window.BASE_URL} component={App}>
                <IndexRoute component={MapList} />
                <Route path=":mapId" component={Map} />
            </Route>
        </Router>
    </Provider>
);

export default Root;