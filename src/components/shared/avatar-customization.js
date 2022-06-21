import React from "react";
import Button from "react-bootstrap/Button";

import Avatar from "./avatar.js";
import ArrowColumn from "./arrow-column.js";

import '../../assets/css/layouts.css';
import { Form } from "react-bootstrap";

//const tracker = new IndexTracker([7, 7, 9, 10]);

class AvatarCustomization extends React.Component {

    maxIndices;
    userName;

    constructor(props) {
        super(props)
        this.maxIndices = props.maxIndices;
        this.state = {
            currentIndices: new Array(this.maxIndices.length).fill(0),
        };
    }

    increase = (index) => {
        const currentIndices = this.state.currentIndices;
        // check if index is out of bounds
        if(index < 0 || index >= currentIndices.length) return;
        currentIndices[index]++;
        // wrap around
        if(currentIndices[index] > this.maxIndices[index]) currentIndices[index] = 0;
        this.setState({currentIndices: currentIndices}, () => this.updateData());
    }

    decrease = (index) => {
        const currentIndices = this.state.currentIndices;
        // check if index is out of bounds
        if(index < 0 || index >= currentIndices.length) return;
        currentIndices[index]--;
        // wrap around
        if(currentIndices[index] < 0) currentIndices[index] = this.maxIndices[index];
        this.setState({currentIndices: currentIndices}, () => this.updateData());
    }

    randomizeAll = () => {
        const currentIndices = this.state.currentIndices.map((e, i) => Math.floor(Math.random() * this.maxIndices[i]));
        this.setState({currentIndices: currentIndices}, () => this.updateData());
    }

    getValue = (index) => {
        const currentIndices = this.state.currentIndices;
        if(index < 0 || index >= currentIndices.length) return;
        return currentIndices[index];
    }

    updateName = (event) => {
        this.userName = event.target.value;
        this.updateData()
    }

    updateData = () => {
        const playerData = {
            name: this.userName,
            avatar: {
                eyes: this.state.currentIndices[0],
                hair: this.state.currentIndices[1],
                accessory: this.state.currentIndices[2],
            }
        }
        if(typeof(this.props.onDataUpdated) === 'function') {
            this.props.onDataUpdated(playerData);
        }
    }

    onKeyDown = (event) => {
        if(event.key !== 'Enter') return;
        if(typeof(this.props.onEnter) === 'function') this.props.onEnter();
    }

    render() {
        return (
            <div className="contentColumn">
                <Form.Control autoFocus
                    type="text"
                    size="lg"
                    onChange={(event) => this.updateName(event)}
                    onKeyDown={(event) => this.onKeyDown(event)}
                    placeholder={this.props.localization.localize('avatar-customization_name')}
                    style={{width: "60%"}}>
                </Form.Control>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "5vw"}}>
                    <ArrowColumn direction="left" size={3} onClick={(i) => this.decrease(i)} />
                    <Avatar eyes={this.getValue(0)} hair={this.getValue(1)} accessory={this.getValue(2)} color={0} />
                    <ArrowColumn direction="right" size={3} onClick={(i) => this.increase(i)} />
                </div>
                <Button onClick={() => this.randomizeAll()} variant="secondary">
                    {this.props.localization.localize('avatar-customization_randomize')}
                </Button>
            </div>
        );
    }
    
}

export default AvatarCustomization;