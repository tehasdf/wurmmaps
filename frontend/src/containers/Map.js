import React, {Component} from 'react';
import {connect} from 'react-redux';

import MapTiles from '../components/MapTiles';
import {fetchMapDetails} from '../actions/maps';

class Map extends Component {
    render(){
        return <MapTiles />
    }
}


export default connect(null, {fetchMapDetails})(Map);
