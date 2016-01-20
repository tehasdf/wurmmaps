import React from 'react';
import {connect} from 'react-redux';

import {editMap} from '../actions/maps';
import {Panel} from './ui';


class EditableMapDetails extends React.Component {
    save(evt){
        evt.preventDefault();
        this.props.editMap({
            name: this.refs.nameInput.value
        });
    }

    render(){
        let map = this.props.map;
        return <Panel label={map.name} name="details">
            <form className="form-horizontal">
                <div className="form-group">
                    <div className="col-sm-12">
                        <label htmlFor="name-input">Name</label>
                        <input
                            ref="nameInput"
                            id="name-input"
                            className="form-control"
                            type="text"
                            defaultValue={map.name}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-12">
                        <label htmlFor="name-input">View-only link</label>
                        <input
                            className="form-control disabled"
                            type="text"
                            value={map.view_id}
                            readOnly={true}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-12">
                        <input
                            type="submit"
                            className="btn btn-default"
                            value="Save"
                            onClick={this.save.bind(this)}
                        />
                    </div>
                </div>
            </form>
        </Panel>

    }

}

const ViewMapDetails = props => {
    return <div>bvc</div>
}
const MapDetails = ({map, editMap}) => {
    if (map.edit){
        return <EditableMapDetails map={map} editMap={editMap} />;
    } else {
        return <ViewMapDetails map={map} />;
    }
}

export default connect(null, {editMap})(MapDetails);
