import {handleActions} from 'redux-actions';

var _ctr = 0;
const _makeFakeID = () => {
    return 'fake-' + (_ctr++);
}

const _hasFakeID = map => {
    return (typeof map.id === "string") && (map.id.slice(0, 5) === 'fake-');
}


const _getCurrentFeatures = state => {
    return state.maps[state.selectedMap].features;
}

const _setCurrentFeatures = (state, features) => {
    let currentMap = state.maps[state.selectedMap];

    return {
        ...state,
        maps: {
            ...state.maps,
            [state.selectedMap]: {
                ...currentMap,
                features
            }
        }
    }
};


const mapsReducer = handleActions({
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

        let newFeatures = _getCurrentFeatures(state).concat(newFeature);
        return _setCurrentFeatures(state, newFeatures);
    },

    CREATE_FEATURE_SUCCESS: (state, action) => {
        let newFeatures = _getCurrentFeatures(state)
            .filter(m => !_hasFakeID(m))
            .concat(action.payload);
        return _setCurrentFeatures(state, newFeatures);

    },

    CREATE_FEATURE_FAILED: (state, action) => {
        let newFeatures = _getCurrentFeatures(state)
            .filter(m => !_hasFakeID(m));

        return _setCurrentFeatures(state, newFeatures);

    },

    START_EDIT_FEATURE: (state, action) => {
        let {id, data} = action.payload;
        let newFeatures = [];
        for (let feature of _getCurrentFeatures(state)){
            if (feature.id === id){
                feature = {
                    ...feature,
                    data
                };
            }
            newFeatures.push(feature);
        }

        return _setCurrentFeatures(state, newFeatures);
    }
}, {maps: {}, selectedMap: null, selectedType: 1});

export default mapsReducer;
