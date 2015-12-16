import {handleActions} from 'redux-actions';


const rootReducer = handleActions({
    MAPS_LIST_RECEIVED: (state, action) => {
        let byId = {};
        action.payload.forEach(map => {
            byId[map.id] = map;
        });

        return {
            maps: Object.assign({}, state.maps, byId),
        }
    },
    START_MAPS_LIST: (state, action) => {
        return {
            mapListFetched: true
        }
    }
}, {maps: [], mapListFetched: false});

export default rootReducer;