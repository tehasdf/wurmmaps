import {handleActions} from 'redux-actions';



const uiReducer = handleActions({
    TOGGLE_PANEL: (state, action) => {
        return {
            ...state,
            panels: {
                ...state.panels,
                [action.payload]: !state.panels[action.payload]
            }
        }
    }
}, {
    panels: {
        details: true,
        selected: true
    }
});

export default uiReducer;