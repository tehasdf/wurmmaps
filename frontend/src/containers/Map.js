import React, {Component} from 'react';
import {connect} from 'react-redux';

import MapTiles from '../components/MapTiles';
import {fetchMapDetails} from '../actions/maps';

class Map extends Component {
    componentDidMount(){
        this.props.fetchMapDetails(this.props.params.mapId);
    }

    render(){
        if (!this.props.map){
            return null;
        }
        return <MapTiles map={this.props.map} />
    }
}

const mapStateToProps = (state, ownProps) => ({
    map: state.maps.selectedMap
});

export default connect(mapStateToProps, {fetchMapDetails})(Map);
