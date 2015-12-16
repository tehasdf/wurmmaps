import fetch from 'isomorphic-fetch';
import {createAction} from 'redux-actions';


const startGetMapsList = createAction('START_MAPS_LIST');

const mapsListReceived = createAction('MAPS_LIST_RECEIVED');


export const fetchMaps = () => (dispatch, getState) => {
    dispatch(startGetMapsList());

    return fetch('http://localhost/9k/api/')
        .then(r => r.json())
        .then(data => dispatch(mapsListReceived(data)));
}
