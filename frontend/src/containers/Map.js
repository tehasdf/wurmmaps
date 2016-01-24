import React, {Component} from 'react';
import {connect} from 'react-redux';

import MapTiles from '../components/MapTiles';
import {fetchMapDetails} from '../actions/maps';

class Map extends Component {
    render(){
        if (!this.props.map){
            return null;
        }
        return <MapTiles map={this.props.map} />
    }
}

const mapStateToProps = state => ({
    map: state.maps.selectedMap
});

export default connect(mapStateToProps)(Map);
