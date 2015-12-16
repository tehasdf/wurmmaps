import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMaps, selectMap} from '../actions';
import MapTiles from '../components/MapTiles';
import MapList from '../components/MapList';


const mapStateToProps = state => {
    return {

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
        } else {
            dispatch(fetchMaps());
        }
    }


    render(){
        return <div>
            <MapList />
            <MapTiles />

        </div>
    }
}


export default connect(mapStateToProps)(App);
