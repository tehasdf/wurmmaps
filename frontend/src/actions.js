import fetch from 'isomorphic-fetch';
import {createAction} from 'redux-actions';
import request from 'superagent';

const startGetMapsList = createAction('START_MAPS_LIST');
const mapsListReceived = createAction('MAPS_LIST_RECEIVED');

const mapSelected = createAction('MAP_SELECTED');

const startGetMapDetails = createAction('START_MAP_DETAILS');
const mapDetailsReceived = createAction('MAP_DETAILS_RECEIVED');

const startCreateFeature = createAction('START_CREATE_FEATURE');


export const selectMap = (mapId) => (dispatch, getState) => {
    dispatch(mapSelected(mapId));
    if (window && window.location){
        window.location.hash = `map=${mapId}`;

    }
}


export const fetchMaps = () => (dispatch, getState) => {
    dispatch(startGetMapsList());

    return fetch('http://localhost/maps/')
        .then(r => r.json())
        .then(data => dispatch(mapsListReceived(data)));
}


export const fetchMapDetails = (mapId) => (dispatch, getState) => {
    dispatch(startGetMapDetails(mapId));

    return fetch(`http://localhost/maps/${mapId}`)
        .then(r => r.json())
        .then(data => dispatch(mapDetailsReceived(data)))
}


export const createFeature = (featureData) => (dispatch, getState) => {
    dispatch(startCreateFeature(featureData));
    let state = getState();
    let mapId = state.selectedMap;
    let featureType = state.selectedType;

    let data = {
        feature_type: featureType,
        map: mapId,
        data: featureData
    };

    return new Promise((resolve, reject) => {
        request
            .post('http://localhost/features/')
            .send(data)
            .end((err, res) => {
                if (err){
                    reject(err)
                } else {
                    resolve(res);
                }
            })
    });
}
