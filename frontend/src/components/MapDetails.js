import React from 'react';
import {connect} from 'react-redux';


const EditableMapDetails = props => {
    return <div>asd</div>;
}

const ViewMapDetails = props => {
    return <div>bvc</div>
}
const MapDetails = ({edit}) => (
    edit ? <EditableMapDetails /> : <ViewMapDetails />
);


const mapStateToProps = state => {
    let map = state.maps.selectedMap;
    if (map === undefined){
        return {};
    }
    return {
        edit: map.edit
    }
};

export default connect(mapStateToProps)(MapDetails);