import React, {Component} from 'react';

import {connect} from 'react-redux';
import {createMap} from '../actions/maps';


class CreateForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'new map name'
        };
    }

    create(){
        this.props.createMap(this.state);
    }

    render(){
        return <div>
            <h3>Create a new map</h3>
            <input
                type='text'
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value})}
            />
            <button onClick={this.create.bind(this)}>Create</button>
        </div>
    }
}


export default connect(null, {createMap})(CreateForm);