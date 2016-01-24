import fetch from 'isomorphic-fetch';
import {createAction} from 'redux-actions';
import request from 'superagent';
import {getURL} from '../util';
import {selectTool} from './ui';

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

const startDeleteFeature = createAction('START_DELETE_FEATURE');
const deleteFeatureSuccess = createAction('DELETE_FEATURE_SUCCESS');
const deleteFeatureFailed = createAction('DELETE_FEATURE_FAILED');

export const featureSelected = createAction('FEATURE_SELECTED');


export const selectMap = (mapId) => (dispatch, getState) => {
    dispatch(mapSelected(mapId));
    dispatch(fetchMapDetails(mapId));

    if (window && window.location){
        window.location.hash = `map=${mapId}`;
    }
}


export const fetchMaps = () => (dispatch, getState) => {
    dispatch(startGetMapsList());

    return fetch(getURL('maps/'))
        .then(r => r.json())
        .then(data => dispatch(mapsListReceived(data)));
}


export const fetchMapDetails = (mapId) => (dispatch, getState) => {
    dispatch(startGetMapDetails(mapId));

    return fetch(getURL(`maps/${mapId}/`))
        .then(r => r.json())
        .then(data => dispatch(mapDetailsReceived(data)))
}


export const mapClick = data => (dispatch, getState) => {
    let state = getState();
    let {selectedTool} = state.ui;

    if (selectedTool === 'reveal'){
        let mapId = state.maps.selectedMap.id;

        dispatch(createFeature({
            feature_type: 1,
            map: mapId,
            data
        }));

        dispatch(selectTool('cursor'));
    }
}

export const createFeature = data => (dispatch, getState) => {
    dispatch(startCreateFeature(data));
    let state = getState().maps;

    let featureType = state.selectedType;

    return new Promise((resolve, reject) => {
        request
            .post(getURL('features/'))
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
        .patch(getURL(`features/${newData.id}/?map=${map.id}`))
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
        .patch(getURL(`maps/${map.id}/`))
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
        .post(getURL('maps/'))
        .send({name: 'new map'})
        .end((err, res) => {
            if (err){
                alert('Cannot create a new map?');
            } else {
                let data = JSON.parse(res.text);
                dispatch(selectMap(data.id));
            }
        });

}


export const deleteFeature = feature => (dispatch, getState) => {
    dispatch(startDeleteFeature(feature));

    let state = getState();
    let map = state.maps.selectedMap;

    request
        .delete(getURL(`features/${feature.id}/?map=${map.id}`))
        .send()
        .end((err, res) => {
            if (err){
                console.error(err);
                dispatch(deleteFeatureFailed(feature));
            } else {
                dispatch(deleteFeatureSuccess(feature));
            }
        });
}


export const selectFeature = feature => (dispatch, getState) => {
    dispatch(featureSelected(feature));
}

