import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMaps} from '../actions';


const mapStateToProps = state => {
    return {
        maps: state.maps
    }
}

class MapList extends Component {
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetchMaps());
    }


    render(){
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
                return <li key={map.id}>{map.name}</li>
            })}
        </ul>
    }
}


export default connect(mapStateToProps)(MapList);