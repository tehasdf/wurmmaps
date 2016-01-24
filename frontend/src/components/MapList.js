import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMaps, selectMap} from '../actions/maps';
import CreateForm from '../components/CreateForm';

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
        this.props.fetchMaps();
    }

    mapSelect(map){
        this.props.selectMap(`${map.id}`);
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
            <div className="row">
                <div className="col-lg-6">
                    <h3>Publicly viewable maps</h3>
                    {mapslist}
                </div>
                <div className="col-lg-6">
                    <CreateForm />
                </div>
            </div>
        </div>
    }
}


export default connect(mapStateToProps, {selectMap, fetchMaps})(MapList);
