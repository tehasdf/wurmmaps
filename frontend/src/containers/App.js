import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMaps} from '../actions';
import MapTiles from '../components/MapTiles';


const mapStateToProps = state => {
    return {

    }
}

class App extends Component {
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(fetchMaps());
    }


    render(){
        return <MapTiles edit={true} />
    }
}


export default connect(mapStateToProps)(App);