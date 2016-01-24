import React from 'react';
import L from 'leaflet';
import Draw from 'leaflet-draw';
import {Map, Rectangle, TileLayer} from 'react-leaflet';
import {connect} from 'react-redux';

import {getURL} from '../util';
import {mapClick, moveFeature, selectFeature} from '../actions/maps';


const SS = L.extend({}, L.CRS, {
    projection: L.Projection.LonLat,
    transformation: new L.Transformation(1, 0, 1, 0)
});



class DraggableOnlyRectangle extends Rectangle {
componentWillMount() {
    super.componentWillMount();
    this.leafletElement.editing._createResizeMarker = function(){ this._resizeMarkers = []; }
  }
}


const createReveal = ({feature, editable, callbacks}) => {
    let size = {lat: 0.029296875, lng: 0.029296875}; // map.unproject([120, 120], 4))
    let data = feature.data;
    let lat = data.lat;
    let lng = data.lng;
    let coords = L.latLngBounds(
        L.latLng({lat: lat, lng: lng}),
        L.latLng({lat: lat + size.lat, lng: lng + size.lng})
    );

    let onEdit = evt => {
        let newCoords = evt.target.getBounds().getSouthWest();

        callbacks.moveFeature({
            id: feature.id,
            data: newCoords
        });
    }

    let onClick = evt => {
        callbacks.selectFeature(feature);
    }

    return <DraggableOnlyRectangle
        key={feature.id}
        bounds={coords}
        editable={editable}
        onLeafletEdit={onEdit}
        onLeafletClick={onClick} />;
}



const _getElementFactory = featureType => {
    switch (featureType) {
        case 1:
            return createReveal;
        default:
            throw new Error(`_getElementFactory: unknown featureType ${featureType}`);
    }
}


class MapComponent extends React.Component {
    mapClick(evt){
        this.props.mapClick(evt.latlng);
    }

    makeFeature(feature){
        let factory = _getElementFactory(feature.feature_type);
        return factory({
            feature,
            editable: this.props.canEdit,
            callbacks: {
                moveFeature: this.props.moveFeature,
                selectFeature: this.props.selectFeature
            }
        });
    }

    render(){
        let elements = this.props.features.map(this.makeFeature.bind(this));
        return <Map
            className="fill"
            center={this.props.center}
            zoom={4}
            crs={SS}
            onLeafletClick={this.mapClick.bind(this)}
        >
            <TileLayer
                url={getURL(`tiles/${this.props.mapname}/{z}/{x}/{y}.png`)}
                tms={true}
                noWrap={true}
            />
            {elements}
        </Map>
    }
}

const mapStateToProps = state => {
    let map = state.maps.selectedMap;
    let features = (map !== undefined) ? map.features : [];

    return {
        map,
        features,
        center: [0.08, 0.66],
        mapname: map.mapname,
        canEdit: map.edit
    }
};

const mapDispatchToProps = {
    mapClick,
    moveFeature,
    selectFeature
};


export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
