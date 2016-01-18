import {handleActions} from 'redux-actions';

var _ctr = 0;
const _makeFakeID = () => {
    return 'fake-' + (_ctr++);
}

const rootReducer = handleActions({
    MAPS_LIST_RECEIVED: (state, action) => {
        let byId = {};
        action.payload.forEach(map => {
            byId[map.id] = map;
        });

        return {
            ...state,
            maps: {...state.maps, ...byId}
        }
    },
    MAP_SELECTED: (state, action) => {
        return {
            ...state,
            selectedMap: action.payload
        }
    },
    MAP_DETAILS_RECEIVED: (state, action) => {
        let newMaps = {};
        newMaps[action.payload.id] = action.payload;

        return {
            ...state,
            maps: {...state.maps, ...newMaps}
        }
    },
    START_CREATE_FEATURE: (state, action) => {
        let newFeature = {
            feature_type: 1,
            data: action.payload,
            id: _makeFakeID()
        };

        let currentMapObj = state.maps[state.selectedMap];
        let newFeatures = currentMapObj.features.concat(newFeature);
        let newMapObj = {
            ...currentMapObj,
            features: newFeatures
        };
        let newMaps = {
            ...state.maps,
            [state.selectedMap]: newMapObj
        };
        return {
            ...state,
            maps: newMaps
        }
    }
}, {maps: {}, selectedMap: null, selectedType: 1});

export default rootReducer;
