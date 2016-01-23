import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMaps, selectMap, createMap} from '../actions/maps';


const mapStateToProps = state => {
    return {
        maps: state.maps.maps
    }
}


const MapListItem = props => (
    <li><a onClick={evt => props.clicked()}>{props.name}</a></li>
)


class MapList extends Component {

    componentDidMount(){
        fetchMaps();
    }

    mapSelect(map){
        this.props.selectMap(`${map.id}`);
    }

    create(){
        this.props.createMap();
    }

    render(){
        let self = this;
        if (!this.props || !this.props.maps){
            return null;
        }
        let {maps} = this.props;
        let mapslist = <div>empty</div>;

        if (Object.keys(maps).length > 0){
            mapslist = <ul>
                {Object.keys(maps).map(k => {
                    let map = maps[k];
                    return <MapListItem
                        key={map.id}
                        name={map.name}
                        clicked={e => self.mapSelect(map)}
                    />
                })}
            </ul>
        }

        return <div>
            <button onClick={this.create.bind(this)}>Create new</button>
            {mapslist}
        </div>
    }
}


export default connect(mapStateToProps, {createMap, selectMap, fetchMaps})(MapList);
