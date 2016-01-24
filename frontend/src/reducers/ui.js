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
    },

    SELECT_TOOL: (state, action) => {
        return {
            ...state,
            selectedTool: action.payload
        }
    }

}, {
    selectedTool: 'cursor',
    panels: {
        details: true,
        selected: true,
        toolbar: true
    }
});

export default uiReducer;