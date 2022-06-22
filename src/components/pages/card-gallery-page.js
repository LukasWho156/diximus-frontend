import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import NavBarPage from "../shared/nav-bar-page";
import PlayingCard from "../shared/playing-card";
import CardViewer from "../shared/card-viewer";

import { serverUrl } from '../../logic/server-url';
import gameDimensions from "../../logic/game-dimensions";
import { Spinner } from "react-bootstrap";

const cardWidth = gameDimensions.cardWidth;
const cardHeight = gameDimensions.cardHeight;

class CardGalleryPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            cards: [],
            viewedCard: null,
        };
    }

    componentDidMount() {
        axios.get(`${serverUrl}/gallery/${this.props.params.id}`).then(res => {
            this.setState({
                title: res.data?.name,
                cards: res.data?.cards.map(card => ({
                    ...card,
                    id: card._id,
                })) ?? [],
            });
        });
    }

    highlightCard = (index) => {
        this.setState((state) => {
            state.cards[index].selected = true;
            return { cards: state.cards };
        });
    }

    unhighlightCard = (index) => {
        this.setState((state) => {
            state.cards[index].selected = false;
            return { cards: state.cards };
        });
    }

    showCard(id) {
        this.setState({viewedCard: id})
    }

    closeViewer() {
        this.setState({viewedCard: null});
    }

    render() {
        return(<NavBarPage localization={this.props.localization} forceRerender={this.props.forceRerender}>
            <h1>{this.props.localization.localize('card-gallery-page_header')}</h1>
            <h2>{this.state.title}</h2>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2em', width: '90%'}}>
                {this.state.cards.length > 0 ? this.state.cards.map((card, i) => {
                    return <div style={{position: 'relative', width: '82px', height: '122px'}} key={card._id}>
                        <PlayingCard cardId={card._id}
                            x={-0.45 * cardWidth}
                            y={-0.45 * cardHeight}
                            z={1}
                            scale={card.selected ? 0.13 : 0.1}
                            flip={0}
                            angle={0}
                            onClick={() => this.showCard(card._id)}
                            onHover={() => this.highlightCard(i)}
                            onLeave={() => this.unhighlightCard(i)}/>
                    </div>
                }) : <Spinner animation="border" />}
            </div>
            {this.state.viewedCard ? <CardViewer
                cards={this.state.cards}
                cardId={this.state.viewedCard}
                onClose={() => this.closeViewer()}
                localization={this.props.localization}
                showDescription={true}
            /> : null}
        </NavBarPage>);
    }

}

const CardGalleryPage = (props) => {
    return(
        <CardGalleryPageComponent {...props} params={useParams()}/>
    );
}

export default CardGalleryPage;