import React from "react";
import PlayingCard from "./playing-card";

import gameDimensions from "../../logic/game-dimensions.js"

const screenWidth = gameDimensions.screenWidth;
const tableHeight = gameDimensions.tableHeight;
const cardWidth = gameDimensions.cardWidth;
const cardHeight = gameDimensions.cardHeight;

class CardHand extends React.Component {

    onHover = (index) => {
        console.log('onHover', index);
        if(typeof(this.props.onHover) === 'function') this.props.onHover(index);
    }

    onLeave = (index) => {
        if(typeof(this.props.onLeave) === 'function') this.props.onLeave(index);
    }

    onClick = (index) => {
        if(typeof(this.props.onClick) === 'function') this.props.onClick(index);
    }

    render() {
        const scale = Math.min((10 / 11) * screenWidth * 0.9 / Math.max(this.props.cards.length, 1) / cardWidth, 0.25)
        let y, selectionDir;
        switch(this.props.position) {
            case 'bottom':
                y = 0.95 * tableHeight - cardHeight * (0.5 * (1 + scale));
                selectionDir = -1;
                break;
            case 'top':
                y = -cardHeight * (0.5 * (1 - scale)) + tableHeight * 0.05;
                selectionDir = 1;
                break;
            default:
                y = (tableHeight - cardHeight) / 2;
                selectionDir = 0;
        }
        const cards = this.props.cards.map((element, i) => {
            return(
                <PlayingCard key={i} cardId={element.id}
                    x={(screenWidth - cardWidth) / 2 + (i - (this.props.cards.length - 1) / 2) * (cardWidth * scale * 1.1)}
                    y={y + selectionDir * (element.selected ? cardHeight * scale * 0.2 : 0)}
                    z={element.selected ? 100 : 1}
                    angle={0}
                    scale={element.selected ? 1.5 * scale : (element.correct ? 1.1 * scale : scale)}
                    flip={0}
                    onHover={() => this.onHover(i)}
                    onLeave={() => this.onLeave(i)}
                    onClick={() => this.onClick(i)}
                    correctCard={element.correct ? true : false}/>
            )
        });
        const infoScale = (cardWidth * scale) / this.props.addInfoWidth;
        const addInfo = this.props.addInfo?.map((element, i) => {
            return (<div key={i} style={{
                position: "absolute",
                left: (screenWidth - this.props.addInfoWidth) / 2 + (i - (this.props.addInfo.length - 1) / 2) * (cardWidth * scale * 1.1),
                top: 0.07 * tableHeight + cardHeight * scale,
                bottom: 0.525 * tableHeight,
                overflowY: "auto",
                overflowX: "hidden",
                transformOrigin: "top",
                zIndex: 1,
                transform: `scale(${infoScale})`}}>
                    {element}
            </div>)
        })
        return(
            <div style={{position: "absolute", width: "100%", height: "100%"}}>
                {cards}
                {addInfo}
            </div>
        )
        
    }

}

export default CardHand;