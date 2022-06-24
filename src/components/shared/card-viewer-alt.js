import React from "react";
import { Button, Form } from "react-bootstrap";

import { serverUrl } from "../../logic/server-url";

import leftArrowImg from '../../assets/images/left_arrow.png';
import rightArrowImg from '../../assets/images/right_arrow.png';

import "../../assets/css/layouts.css"

class CardViewerAlt extends React.Component {

    hint;

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.cards.findIndex(e => e.id === this.props.cardId),
        }
    }

    onClose() {
        if(typeof(this.props.onClose) === 'function') this.props.onClose();
    }

    onConfirm() {
        if(typeof(this.props.onConfirm) === 'function') this.props.onConfirm(this.props.cards[this.state.index]?.id, this.hint);
    }

    onKeyDown = (event) => {
        if(event.key !== 'Enter') return;
        this.onConfirm();
    }

    adjustHint(event) {
        this.hint = event.target.value;
    }

    prev = (e) => {
        e.stopPropagation();
        this.setState((state, props) => ({index: ((state.index - 1) < 0) ? props.cards.length - 1 : state.index - 1}));
    }

    next = (e) => {
        e.stopPropagation();
        this.setState((state, props) => ({index: ((state.index + 1) >= props.cards.length) ? 0 : state.index + 1}));
    }

    render() {
        let descriptionDiv = '';
        let confirmDiv = '';
        let textfield = '';
        if(this.props.showDescription) {
            descriptionDiv = (<div className="contentColumn">
                <h2 className="whiteText" style={{textAlign: 'center'}}>
                    {this.props.cards[this.state.index]?.title}
                </h2>
                <p className="whiteText">
                    {this.props.cards[this.state.index]?.artist} ({this.props.cards[this.state.index]?.year})
                </p>
                <p className="whiteText">
                    {this.props.localization.localize('card-viewer_license')}&nbsp;
                    <a href={this.props.localization.localizeObject(this.props.cards[this.state.index]?.license.link)}
                        className="light" target="_blank" rel="noreferrer">
                        {this.props.localization.localizeObject(this.props.cards[this.state.index]?.license.name)}
                    </a>
                </p>
            </div>)
        }
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
                    e.stopPropagation();
                }}>
                <h2 className="whiteText">
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
        return (
            <div style={{position: "fixed", width: "100%", height: "100%", maxHeight: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6", zIndex: 200, paddingTop: '1em'}}
                onClick={() => this.onClose()} className="contentColumn">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '100%'}}>
                    <img src={leftArrowImg} alt="Previous" className="clickable" onClick={(e) => this.prev(e)}/>
                    <img src={`${serverUrl}/card/${this.props.cards[this.state.index]?.id}`} alt="Card" onClick={() => this.onClose()}
                        style={{maxHeight: '90vh', maxWidth: '80vw', flexShrink: 1, borderRadius: '5%'}}/>
                    <img src={rightArrowImg} alt="Next" className="clickable" onClick={(e) => this.next(e)}/>
                </div>
                {confirmDiv}
                {descriptionDiv}
            </div>
        )
    }
}

export default CardViewerAlt;