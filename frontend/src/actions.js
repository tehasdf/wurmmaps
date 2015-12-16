import fetch from 'isomorphic-fetch';
import {createAction} from 'redux-actions';


const startGetMapsList = createAction('START_MAPS_LIST');
const mapsListReceived = createAction('MAPS_LIST_RECEIVED');
const mapSelected = createAction('MAP_SELECTED');


export const selectMap = (mapId) => (dispatch, getState) => {
    dispatch(fetchMaps(mapId));
    dispatch(mapSelected(mapId));
    if (window && window.location){
        window.location.hash = `map=${mapId}`;

    }
}

export const fetchMaps = (mapId) => (dispatch, getState) => {
    let {maps, mapListFetched} = getState();
    if (mapListFetched){
        if (mapId === undefined){
            return;
        }
    }

    dispatch(startGetMapsList());

    return fetch('http://localhost/maps/')
        .then(r => r.json())
        .then(data => dispatch(mapsListReceived(data)));
}
