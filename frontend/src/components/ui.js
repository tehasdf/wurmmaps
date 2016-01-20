import React from 'react';
import {connect} from 'react-redux';
import {togglePanel} from '../actions/ui';


const panelMapStateToProps = (state, ownProps) => ({
    shown: state.ui.panels[ownProps.name]
});


export const PanelBody = ({children}) => (
    <div className="panel-body">
        {children}
    </div>
);

const _PanelToggle = ({shown, name, togglePanel}) => {
    let icon = shown ? 'glyphicon glyphicon-minus' : 'glyphicon glyphicon-plus';
    return <a className="btn btn-default"
        onClick={e => togglePanel(name)}
    >
        <span className={icon} />
    </a>
}
const PanelToggle = connect(null, {togglePanel})(_PanelToggle);


const PanelHeader = ({name, label, hasChildren, shown}) => {
    let toggle = null;

    if (hasChildren){
        toggle = <div className="btn-group pull-right">
            <PanelToggle shown={shown} name={name} />
        </div>
    }

    return <div className="panel-heading">
        <span className="panel-title">{label}</span>
        {toggle}
        <div className="clearfix" />
    </div>
}


const _Panel = props => {
    let body = null;
    console.log('ta', props.shown);
    if (props.children && props.shown){
        body = <PanelBody name={props.name}>{props.children}</PanelBody>
    }

    return <div className="panel panel-default">
        <PanelHeader hasChildren={!!props.children} {...props} />
        {body}
    </div>

}

export const Panel = connect(panelMapStateToProps)(_Panel);
