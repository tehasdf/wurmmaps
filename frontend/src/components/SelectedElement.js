import React from 'react';
import {connect} from 'react-redux';

import {Panel} from  '../components/ui';
import {deleteFeature} from '../actions/maps';


const SelectedElement = ({feature, deleteFeature}) => {
    console.log('feature', feature);
    if (feature === null){
        return <div />
    }

    return <Panel label="Selected" name="selected">
        {feature.id} <a onClick={() => deleteFeature(feature)}>Delete</a>
    </Panel>
}

const mapStateToProps = state => ({
    feature: state.maps.selectedFeature
});

export default connect(mapStateToProps, {deleteFeature})(SelectedElement);
