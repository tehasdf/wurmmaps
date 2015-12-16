import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMaps} from '../actions';


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
        return <div>asd</div>
    }
}


export default connect(mapStateToProps)(App);