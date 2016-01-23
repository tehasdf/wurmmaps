import fetch from 'isomorphic-fetch';
import {createAction} from 'redux-actions';
import request from 'superagent';

const startGetMapsList = createAction('START_MAPS_LIST');
const mapsListReceived = createAction('MAPS_LIST_RECEIVED');

const mapSelected = createAction('MAP_SELECTED');

const startGetMapDetails = createAction('START_MAP_DETAILS');
const mapDetailsReceived = createAction('MAP_DETAILS_RECEIVED');

const startCreateFeature = createAction('START_CREATE_FEATURE');
const createFeatureSuccess = createAction('CREATE_FEATURE_SUCCESS');
const createFeatureFailed = createAction('CREATE_FEATURE_FAILED');

const startEditFeature = createAction('START_EDIT_FEATURE');
const editFeatureSuccess = createAction('EDIT_FEATURE_SUCCESS');
const editFeatureFailed = createAction('EDIT_FEATURE_FAILED');

const startEditMap = createAction('START_EDIT_MAP');
const editMapSuccess = createAction('EDIT_MAP_SUCCESS');
const editMapFailed = createAction('EDIT_MAP_FAILED');

const startCreateMap = createAction('START_CREATE_MAP');


export const selectMap = (mapId) => (dispatch, getState) => {
    dispatch(mapSelected(mapId));
    dispatch(fetchMapDetails(mapId));

    if (window && window.location){
        window.location.hash = `map=${mapId}`;
    }
}


export const fetchMaps = () => (dispatch, getState) => {
    dispatch(startGetMapsList());

    return fetch('http://127.0.0.1:8000/maps/')
        .then(r => r.json())
        .then(data => dispatch(mapsListReceived(data)));
}


export const fetchMapDetails = (mapId) => (dispatch, getState) => {
    dispatch(startGetMapDetails(mapId));

    return fetch(`http://127.0.0.1:8000/maps/${mapId}/`)
        .then(r => r.json())
        .then(data => dispatch(mapDetailsReceived(data)))
}


export const createFeature = (featureData) => (dispatch, getState) => {
    dispatch(startCreateFeature(featureData));
    let state = getState().maps;
    let mapId = state.selectedMap.id;
    let featureType = state.selectedType;

    let data = {
        feature_type: featureType,
        map: mapId,
        data: featureData
    };

    return new Promise((resolve, reject) => {
        request
            .post('http://127.0.0.1:8000/features/')
            .send(data)
            .end((err, res) => {
                if (err){
                    reject(err)
                } else {
                    resolve(res);
                }
            })
    })
        .then(r => JSON.parse(r.text))
        .then(r => {
            dispatch(createFeatureSuccess(r));
        })
        .catch(() => {
            dispatch(createFeatureFailed());
        })
}


export const moveFeature = newData => (dispatch, getState) => {
    dispatch(startEditFeature(newData));
    let state = getState();
    let map = state.maps.selectedMap;
    request
        .patch(`http://127.0.0.1:8000/features/${newData.id}/?map=${map.id}`)
        .send(newData)
        .end((err, res) => {
            if (err){
                dispatch(editFeatureFailed());
            } else {
                dispatch(editFeatureSuccess());
            }
        });
}


export const editMap = newData => (dispatch, getState) => {
    dispatch(startEditMap(newData));

    let state = getState();
    let map = state.maps.selectedMap;

    request
        .patch(`http://127.0.0.1:8000/maps/${map.id}/`)
        .send(newData)
        .end((err, res) => {
            if (err){
                dispatch(editMapFailed());
            } else {
                dispatch(mapDetailsReceived(JSON.parse(res.text)));
                dispatch(editMapSuccess());
            }
        });
}


export const createMap = data => (dispatch, getState) => {
    dispatch(startCreateMap(data));

    request
        .post(`http://127.0.0.1:8000/maps/`)
        .send({name: 'new map'})
        .end((err, res) => {
            console.log('r', err, res);
        })

}