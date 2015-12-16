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
    START_MAPS_LIST: (state, action) => {
        return {
            ...state,
            mapListFetched: true
        }
    },
    MAP_SELECTED: (state, action) => {
        return {
            ...state,
            selectedMap: action.payload
        }
    }
}, {maps: {}, mapListFetched: false, selectedMap: null});

export default rootReducer;