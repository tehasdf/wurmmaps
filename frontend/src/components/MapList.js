import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMaps, selectMap} from '../actions';


const mapStateToProps = state => {
    return {
        maps: state.maps
    }
}


const MapListItem = props => (
    <li><a onClick={evt => props.clicked()}>{props.name}</a></li>
)

class MapList extends Component {


    mapSelect(map){
        this.props.dispatch(selectMap(map.id));
    }

    render(){
        let self = this;
        if (!this.props || !this.props.maps){
            return null;
        }
        let {maps} = this.props;
        if (Object.keys(maps).length === 0){
            return <div>empty</div>;
        }
        return <ul>
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
}


export default connect(mapStateToProps)(MapList);