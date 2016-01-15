import {handleActions} from 'redux-actions';


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
    }
}, {maps: {}, selectedMap: null, selectedType: 1});

export default rootReducer;