import React, {Component} from 'react';
import {connect} from 'react-redux';

import MapTiles from '../components/MapTiles';
import {fetchMapDetails} from '../actions';


const mapStateToProps = (state, ownProps) => {
    return {
        map: state.maps.maps[ownProps.mapId]
    }
}

class Map extends Component {
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetchMapDetails(this.props.mapId));
    }

    render(){
        return <MapTiles map={this.props.map} />
    }
}


export default connect(mapStateToProps)(Map);
