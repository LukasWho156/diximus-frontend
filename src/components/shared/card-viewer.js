import React from "react";
import { Button, Form } from "react-bootstrap";

import PlayingCard from "./playing-card";
import gameDimensions from "../../logic/game-dimensions";

import leftArrowImg from '../../assets/images/left_arrow.png';
import rightArrowImg from '../../assets/images/right_arrow.png';

import "../../assets/css/layouts.css"
import CardViewerAlt from "./card-viewer-alt";

//const screenWidth = gameDimensions.screenWidth;
//const screenHeight = gameDimensions.screenHeight;
const cardWidth = gameDimensions.cardWidth;
const cardHeight = gameDimensions.cardHeight;

const defaultCutoffRatio = cardWidth / cardHeight * 1.2;
const descriptionCutoffRatio = (cardWidth * 5) / (cardHeight * 2.6);
const centerCutoffRatio = (cardWidth * 5) / (cardHeight * 1.8);

class CardViewer extends React.Component {

    hint;

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.cards.findIndex(e => e.id === this.props.cardId),
            width: window.innerWidth,
            height: window.innerHeight,
            useAlternate: false,
        }
    }

    componentDidMount() {
        this.onResize();
        window.addEventListener('resize', () => this.onResize());
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
        if(e) e.stopPropagation();
        this.setState((state, props) => ({index: ((state.index - 1) < 0) ? props.cards.length - 1 : state.index - 1}));
    }

    next = (e) => {
        if(e) e.stopPropagation();
        this.setState((state, props) => ({index: ((state.index + 1) >= props.cards.length) ? 0 : state.index + 1}));
    }

    onResize = () => {
        const body = document.querySelector('body');
        this.setState({
            width: body.clientWidth,
            height: body.clientHeight,
            useAlternate: (body.clientWidth / body.clientHeight)
                < ((this.props.showDescription || this.props.onConfirm) ? descriptionCutoffRatio : defaultCutoffRatio),
        })
    }

    render() {
        if(this.state.useAlternate) return <CardViewerAlt {...this.props} />
        let descriptionDiv = '';
        let confirmDiv = '';
        let textfield = '';
        if(this.props.showDescription) {
            descriptionDiv = (<div className="contentColumn"
                style={{position: "absolute", left: "70%", right: "5%", top: "20%", bottom: "20%", alignItems: "flex-start"}}>
                <h2 className="whiteText">
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
                }}
                style={{position: "absolute", left: "70%", right: "5%", top: "20%", bottom: "20%", alignItems: "flex-start"}}>
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
        let x = (this.state.width - cardWidth) / 2;
        const ratio = this.state.width / this.state.height;
        const fullWayPart = (ratio - centerCutoffRatio) / (descriptionCutoffRatio - centerCutoffRatio);
        const scale = (0.95 * this.state.height / cardHeight)
        if((this.props.showDescription || this.props.onConfirm) && ratio < centerCutoffRatio) {
            console.log('Full way:', fullWayPart);
            x = (this.state.width - cardWidth) / 2 - cardWidth * 0.3 * fullWayPart * scale;
        }
        return (
            <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6", zIndex: 200}}
                onClick={() => this.onClose()}>
                <PlayingCard
                    cardId={this.props.cards[this.state.index]?.id}
                    x={x}
                    y={(this.state.height - cardHeight) / 2}
                    z={200}
                    scale={scale}
                    angle={0}
                    flip={0}
                    onClick={() => this.onClose()}
                    onSwipeLeft={() => this.next()}
                    onSwipeRight={() => this.prev()}/>
                {confirmDiv}
                {descriptionDiv}
                <img src={leftArrowImg} alt="Previous" className="clickable" onClick={(e) => this.prev(e)} 
                    style={{position: "absolute", left: "5%", top: "50%", transform: "translate(0, -50%)"}}/>
                <img src={rightArrowImg} alt="Next" className="clickable" onClick={(e) => this.next(e)} 
                    style={{position: "absolute", right: "5%", top: "50%", transform: "translate(0, -50%)"}}/>
            </div>
        )
    }
}

export default CardViewer;