import React from 'react';
import L from 'leaflet';
import Draw from 'leaflet-draw';
import {Map, Rectangle, TileLayer} from 'react-leaflet';

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
    reveal(map, data){
        var size = map.unproject([120, 120], 4);

        var lat = data.payload.lat;
        var lng = data.payload.lng;
        var coords = L.latLngBounds(
            L.latLng({lat: lat, lng: lng}),
            L.latLng({lat: lat + size.lat, lng: lng + size.lng})
        );

        function onEdit(evt){
            var newCoords = evt.target.getBounds().getSouthWest();
            // ElementActions.saveElement({
            //     id: data.id,
            //     kind: data.kind,
            //     layer: data.layer,
            //     payload: {
            //             lat: newCoords.lat,
            //             lng: newCoords.lng,
            //     }
            // })
        }

        function onClick(evt){
            ElementActions.select(data);
        }


        return <DraggableOnlyRectangle
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
        // this._unsubscribe = ElementsStore.listen(this.onElementsChange.bind(this));
        // ElementActions.getElements();
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
        // ElementActions.mapClick(evt.latlng);
    }

    render(){
        var selected = this.state.layers;
        var elements = [];

        if (this.refs.map){
            var map = this.refs.map.getLeafletElement();

            this.state.elements.forEach(data => {
                if (!selected[data.layer]){
                    return;
                }
                var factory = elementFactory[data.kind];
                if (factory){
                    data.edit = true; //this.context.edit;
                    elements.push(factory(map, data))
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

export default MapComponent;