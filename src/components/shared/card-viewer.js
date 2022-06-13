import React from "react";
import { Button, Form } from "react-bootstrap";

import PlayingCard from "./playing-card";
import gameDimensions from "../../logic/game-dimensions";

import "../../assets/css/layouts.css"

//const screenWidth = gameDimensions.screenWidth;
//const screenHeight = gameDimensions.screenHeight;
const cardWidth = gameDimensions.cardWidth;
const cardHeight = gameDimensions.cardHeight;

class CardViewer extends React.Component {

    hint;

    onClose() {
        if(typeof(this.props.onClose) === 'function') this.props.onClose();
    }

    onConfirm() {
        if(typeof(this.props.onConfirm) === 'function') this.props.onConfirm(this.props.cardId, this.hint);
    }

    onKeyDown = (event) => {
        if(event.key !== 'Enter') return;
        this.onConfirm();
    }

    adjustHint(event) {
        this.hint = event.target.value;
    }

    render() {
        let confirmDiv = '';
        let textfield = '';
        if(this.props.placeholder) {
            textfield = (
                <div>
                    <Form.Control type="text" id="tfCardViewer" onKeyDown={(e) => this.onKeyDown(e)}
                        placeholder={this.props.placeholder} onChange={(e) => this.adjustHint(e)} autoFocus>
                    </Form.Control>
                </div>
            );
        }
        if(typeof(this.props.onConfirm) === 'function') confirmDiv = (
            <div className="contentColumn" onClick={(e) => {
                    console.log("Event", e);
                    e.stopPropagation();
                }}
                style={{position: "absolute", left: "70%", right: "0", top: "20%", bottom: "20%", alignItems: "flex-start"}}>
                <h2 style={{color: "white", textShadow: "black 0px 0px 5px"}}>
                    {this.props.localization.localize('card-viewer_choose-this-card')}
                </h2>
                {textfield}
                <div>
                    <Button variant="success" onClick={ () => this.onConfirm() }>
                        {this.props.localization.localize('button_confirm')}
                    </Button>
                    <Button variant="danger" onClick={() => this.onClose()}>
                        {this.props.localization.localize('button_cancel')}
                    </Button>
                </div>
            </div>
        );
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        return (
            <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6", zIndex: 200}}
                onClick={() => this.onClose()}>
                <PlayingCard
                    cardId={this.props.cardId}
                    x={(screenWidth - cardWidth) / 2}
                    y={(screenHeight - cardHeight) / 2}
                    z={200}
                    scale={(0.95 * screenHeight / cardHeight)}
                    angle={0}
                    flip={0}
                    onClick={() => this.onClose()}/>
                {confirmDiv}
            </div>
        )
    }
}

export default CardViewer;