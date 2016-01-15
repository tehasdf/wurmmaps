import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMaps, selectMap} from '../actions';
import Map from './Map';
import MapList from '../components/MapList';


const mapStateToProps = state => {
    return {
        selected: state.selectedMap
    }
}

const parseHash = str => {
    str = str.replace(/^#/, '');
    let rv = {};
    let parts = str.split('&');
    parts.forEach(part => {
        let [k, v] = part.split('=');
        rv[k] = v;
    });
    return rv;
}


class App extends Component {
    componentDidMount(){
        const {dispatch} = this.props;
        let parts = parseHash(window.location.hash);
        if (parts.map){
            dispatch(selectMap(parts.map));
        }
    }

    render(){
        return <div className="fill">
            {this.props.selected
                ? <Map mapId={this.props.selected} />
                : <MapList />}
        </div>
    }
}


export default connect(mapStateToProps)(App);
