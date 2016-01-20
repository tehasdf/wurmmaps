import React from 'react';
import Reflux from 'reflux';

import {togglePanel} from '../actions/ui';



export var UIActions = Reflux.createActions([
    'togglePanel'
]);

export var UIStore = Reflux.createStore({
    listenables: [UIActions],
    init(){
        this.state = {
            toolbar: true,
            selected: true,
            layers: false,
            details: true
        }
    },

    getInitialState(){
        return this.state
    },

    onTogglePanel(which){
        this.state[which] = !this.state[which];
        this.trigger(this.state);
    }
})

export class PanelBody extends React.Component {
    constructor(){
        super();
        this.state = {shown: false};
    }

    uiStateChanged(state){
        this.setState({shown: state[this.props.name]})
    }

    componentDidMount(){
        UIStore.listen(this.uiStateChanged.bind(this));
        this.uiStateChanged(UIStore.getInitialState())
    }

    render(){
        if (!this.state.shown){
            return null;
        }
        return <div className="panel-body">
            {this.props.children}
        </div>
    }
}

class _PanelToggle extends React.Component {
    constructor(){
        super();
        this.state = {shown: false};
    }

    uiStateChanged(state){
        this.setState({shown: state[this.props.name]})
    }

    componentDidMount(){
        UIStore.listen(this.uiStateChanged.bind(this));
        this.uiStateChanged(UIStore.getInitialState())
    }

    toggle(){
        UIActions.togglePanel(this.props.name)
    }

    render(){
        var icon = this.state.shown ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus';
        return <a onClick={this.toggle.bind(this)} className="btn btn-default"><span className={icon}></span></a>
    }
}

export const PanelToggle = connect(panelMapStateToProps, {togglePanel})(PanelToggle);

class PanelHeader extends React.Component {
    render(){
        var toggle = null;
        if (this.props.hasChildren){
            toggle = <div className="btn-group pull-right">
                <PanelToggle name={this.props.name} />
            </div>
        }
        return <div className="panel-heading">
        <span className="panel-title">{this.props.label}</span>
        {toggle}
        <div className="clearfix" />
      </div>
    }
}



const _Panel = ({shown, children}) => {
    let body = null;
    if (children && shown){
        body = <PanelBody name={this.props.name}>{children}</PanelBody>
    }

    return <div className="panel panel-default">
        <PanelHeader hasChildren={!!body} {...this.props} />
        {body}
    </div>

}


const panelMapStateToProps = (state, ownProps) => {
    shown: state.ui.panels[ownProps.name]
}

export const Panel = connect(panelMapStateToProps)(_Panel);