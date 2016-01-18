import React from 'react';
import L from 'leaflet';
import Draw from 'leaflet-draw';
import {Map, Rectangle, TileLayer} from 'react-leaflet';
import {connect} from 'react-redux';

import {createFeature, moveFeature} from '../actions';

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



const elementFactory = {
    1: function(map, feature, callbacks){
        var size = map.unproject([120, 120], 4);
        var data = feature.data;
        var lat = data.lat;
        var lng = data.lng;
        var coords = L.latLngBounds(
            L.latLng({lat: lat, lng: lng}),
            L.latLng({lat: lat + size.lat, lng: lng + size.lng})
        );

        function onEdit(evt){
            var newCoords = evt.target.getBounds().getSouthWest();
            console.log('ta', newCoords);
            callbacks.moveFeature({
                id: feature.id,
                data: newCoords
            });
        }

        function onClick(evt){
            ElementActions.select(data);
        }


        return <DraggableOnlyRectangle
            key={feature.id}
            bounds={coords}
            editable={data.edit}
            onLeafletEdit={onEdit}
            onLeafletClick={onClick} />;
    }
}

class MapComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            elements: [],
            layers: {}
        }
    }

    componentDidMount(){
    }

    onLayersChange(layers){
        this.setState({layers: layers.selected})
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    onElementsChange(elems){
        var e = [];
        for (var i in elems){
            e.push(elems[i])
        }
        this.setState({elements: e})
    }

    mapClick(evt){
        this.props.createFeature(evt.latlng);
    }

    render(){
        if (!this.props.map || !this.props.features){
            return null;
        }
        var selected = this.state.layers;
        var elements = [];
        if (this.refs.map){
            var map = this.refs.map.getLeafletElement();

            this.props.features.forEach(feature => {
                var factory = elementFactory[feature.feature_type];
                if (factory){
                    feature.data.edit = true; //this.context.edit;
                    elements.push(factory(map, feature, {
                        moveFeature: this.props.moveFeature
                    }))
                }
            })
        }

        return <Map ref="map" className="fill" center={[0.08, 0.66]} zoom={4} crs={SS} onLeafletClick={this.mapClick.bind(this)}>
            <TileLayer
                url='http://localhost/tiles/independence/{z}/{x}/{y}.png'
                tms={true} noWrap={true}
            />
            {elements}
        </Map>
    }
}

const mapStateToProps = state => {
    let map = state.maps[state.selectedMap];
    let features = (map !== undefined) ? state.maps[state.selectedMap].features : [];

    return {map, features}
};

const mapDispatchToProps = {
    createFeature,
    moveFeature
};


export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
