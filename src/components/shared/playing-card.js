import React from "react";
import {Motion, spring} from "react-motion";

import serverUrl from "../../logic/server-url";

import "../../assets/css/playing-card.css";

class PlayingCard extends React.Component {

    onHover = () => {
        console.log('hovered');
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
                    <div className="playingCardInner" style={{transform: `rotateY(${interpolate.flip * 180}deg)`}}>
                        <div className="playingCardFront" style={cardStyle}>
                            <img src={`${serverUrl}/card/${this.props.cardId}`} alt="Karte" className="playingCardImage" />
                        </div>
                        <div className="playingCardBack" style={cardStyle}></div>
                    </div>
                </div>}
            </Motion>
        )
    }

}

export default PlayingCard;