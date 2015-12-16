import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMaps} from '../actions';
import MapTiles from '../components/MapTiles';
import MapList from '../components/MapList';


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
        return <div>
            <MapList />

        </div>
    }
}


export default connect(mapStateToProps)(App);
