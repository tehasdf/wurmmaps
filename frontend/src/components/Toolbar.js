import React from 'react';
import {connect} from 'react-redux';

import {Panel} from  '../components/ui';
import {selectTool} from '../actions/ui';


const SelectedElement = ({selectedTool, selectTool}) => {

    let labels = {
        cursor: 'Cursor',
        reveal: 'Reveal'
    };

    return <Panel label="Toolbar" name="toolbar">
        {Object.keys(labels).map(tool => {
            let className = 'btn btn-block btn-md ' + (tool === selectedTool ? 'btn-primary' : 'btn-default');
            let label = labels[tool];

            return <button
                key={tool}
                className={className}
                onClick={() => selectTool(tool)}
            >{label}</button>
        })}
    </Panel>
}

const mapStateToProps = state => ({
    selectedTool: state.ui.selectedTool
});

export default connect(mapStateToProps, {selectTool})(SelectedElement);
