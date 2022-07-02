import React from "react";
import {Motion, spring} from "react-motion";

import { serverUrl } from "../../logic/server-url";

import "../../assets/css/playing-card.css";
import SwipeArea from "./swipe-area";

/**
 * An animatable representaion of a playing card that can be interacted with. Animation is
 * automatically done by React Motion whenever the card's position / scale parameters are changed.
 * 
 * @property {number} x the x coordinate of the card's top left corner, relative to the container
 * @property {number} y the y coordinate of the card's top left corner, relative to the container
 * @property {number} scale the relative scale of the card. 1 corresponds to a width of 1220 pixels
 * and a height of 820 pixels.
 * @property {number} angle the angle along the card's z axis
 * @property {number} flip 1 if the card's backside should be visible, 0 if the frontside should be
 * visible
 * @property {function} onHover function that is called when the card is hovered
 * @property {function} onLeave function that is called when the card is not hovered anymore
 * @property {funciton} onClick function that is called when the card is clicked
 * @property {function} onSwipeLeft function that is called when the card is swiped to the left
 * @property {funciton} onSwipeRight function that is called when the card is swiped to the right
 * 
 * @memberof components.shared
 */
class PlayingCard extends React.Component {

    onHover = () => {
        if(typeof(this.props.onHover) === 'function') this.props.onHover();
    }

    onLeave = () => {
        if(typeof(this.props.onLeave) === 'function') this.props.onLeave();
    }

    onClick = () => {
        if(typeof(this.props.onClick) === 'function') this.props.onClick();
    }

    render() {
        const cardStyle = {};
        if(this.props.correctCard) cardStyle.boxShadow = "0px 0px 25px 25px rgba(0, 255, 0, 0.4)";
        return (
            <Motion style={{
                x: spring(this.props.x),
                y: spring(this.props.y),
                z: spring(this.props.z),
                angle: spring(this.props.angle),
                flip: spring(this.props.flip),
                scale: spring(this.props.scale),
            }} defaultStyle={{
                x: this.props.x,
                y: this.props.y,
                z: this.props.z,
                angle: 0,
                flip: 1,
                scale: 0,
            }}>
                {interpolate => <div
                    className="playingCardContainer"
                    style={{transform: `translate(${interpolate.x}px, ${interpolate.y}px) ` +
                                        `rotate(${interpolate.angle}deg)` +
                                        `scale(${interpolate.scale})`,
                            zIndex: Math.floor(interpolate.z)}}
                    onMouseEnter={() => this.onHover()}
                    onMouseLeave={() => this.onLeave()}
                    onClick={() => this.onClick()}>
                    <SwipeArea onSwipeLeft={this.props.onSwipeLeft} onSwipeRight={this.props.onSwipeRight}>
                        <div className="playingCardInner" style={{transform: `rotateY(${interpolate.flip * 180}deg)`}}>
                            <div className="playingCardFront" style={cardStyle}>
                                <img src={`${serverUrl}/card/${this.props.cardId}`} alt="Karte" className="playingCardImage" />
                            </div>
                            <div className="playingCardBack" style={cardStyle}></div>
                        </div>
                    </SwipeArea>
                </div>}
            </Motion>
        )
    }

}

export default PlayingCard;