import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { Motion, spring } from "react-motion";

import CardHand from "../shared/card-hand";
import CardViewer from "../shared/card-viewer";
import gameDimensions from "../../logic/game-dimensions";
import PlayerBox from "../shared/player-box";

import "../../assets/css/tabletop.css";
import "../../assets/css/clickable.css";
import "../../assets/css/player-bar.css";
import PlayerBar from "../shared/player-bar";

import drip from "../../assets/sfx/drip.mp3";

const width = gameDimensions.screenWidth;
const height = gameDimensions.screenHeight;
const tableHeight = gameDimensions.tableHeight;

const bottomFocusStates = ['init', 'waitForHint', 'waitForCards'];

class MainGamePage extends React.Component {

    credentials;
    messageSfx;

    constructor(props) {
        super(props);
        this.credentials = {
            gameId: this.props.params.id,
            playerId: window.localStorage.getItem('diximusPlayerId'),
            privateId: window.localStorage.getItem('diximusPrivateId'),
        }
        this.state = {
            scale: 1,
            focusBottom: true,
            players: [],
            handCards: [],
            chosenCards: [],
            runningState: {
                state: 'pending',
                activePlayer: '',
            },
            viewedCard: null,
            viewedCardList: [],
            hint: '',
            totalTurns: 0,
        };
    }

    componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);

        this.messageSfx = new Audio(drip);

        this.props.socket.emit('getgameinfo', this.credentials);

        this.props.socket.on('gameinforesponse', (data) => {
            if(!data.success) return;
            this.setState({totalTurns: data.totalTurns});
        });
        this.props.socket.on('playerresponse', (data) => {
            if(!data.success) return;
            this.setState({players: data.players});
        });
        this.props.socket.on('cardresponse', (data) => {
            if(!data.success) return;
            this.setState({handCards: data.cards});
        });
        this.props.socket.on('chosencardresponse', (data) => {
            if(!data.success) return;
            this.setState((state) => {
                if(state.runningState.activePlayer) {
                    for(const card of data.cards) {
                        card.correct = (card.owner === state.runningState.activePlayer);
                    }
                }
                return {chosenCards: data.cards};
            });
        });
        this.props.socket.on('runningstatechanged', (data) => {
            this.messageSfx.play();
            if(data.state === 'waitForHint') this.props.socket.emit('gethandcards', this.credentials);
            this.setState((state) => {
                const newState = {
                    runningState: data,
                    focusBottom: (bottomFocusStates.findIndex(e => e === data.state) >= 0),
                }
                if(data.state === 'evaluation' && state.chosenCards.length > 0) {
                    for(const card of state.chosenCards) {
                        card.correct = (card.owner === data.activePlayer);
                    }
                    newState.chosenCards = state.chosenCards;
                }
                return newState;
            });
            this.closeViewer();
        })
        this.props.socket.on('hintgiven', (data) => {
            this.setState({hint: data});
        })
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => {
        const body = document.querySelector('body');
        this.setState({scale: Math.min(body.clientWidth / width, body.clientHeight / height)});
    }

    highlightHandCard = (index) => {
        this.setState((state) => {
            state.handCards[index].selected = true;
            return { handCards: state.handCards };
        });
    }

    unhighlightHandCard = (index) => {
        this.setState((state) => {
            state.handCards[index].selected = false;
            return { handCards: state.handCards };
        });
    }

    highlightChosenCard = (index) => {
        this.setState((state) => {
            state.chosenCards[index].selected = true;
            return { chosenCards: state.chosenCards };
        });
    }

    unhighlightChosenCard = (index) => {
        this.setState((state) => {
            state.chosenCards[index].selected = false;
            return { chosenCards: state.chosenCards };
        });
    }

    /* for testing purposes
    drawCard = () => {
        this.setState((state) => {
            state.handCards.push({id: "629ca6aeda15aa531367bd36"});
            return {handCards: state.handCards};
        })
    }
    */

    viewHandCard = (index) => {
        this.setState((state) => {
            return { viewedCard: state.handCards[index]?.id, viewedCardList: state.handCards };
        })
    }

    viewChosenCard = (index) => {
        this.setState((state) => {
            return { viewedCard: state.chosenCards[index]?.id, viewedCardList: state.chosenCards };
        })
    }

    closeViewer = () => {
        this.setState({ viewedCard: null })
    }

    iWantToGoFirst = () => {
        this.props.socket.emit('iwanttogofirst', this.credentials);
    }

    giveHint = (cardId, hint) => {
        if(!hint) return;
        this.props.socket.emit('givehint', {
            ...this.credentials,
            hint: {
                card: cardId,
                hint: hint,
            }
        })
    }

    giveCard = (cardId) => {
        this.props.socket.emit('givecard', {
            ...this.credentials,
            card: cardId,
        })
        this.closeViewer();
    }

    guess = (cardId) => {
        this.props.socket.emit('guess', {
            ...this.credentials,
            card: cardId,
        })
        this.closeViewer();
    }

    nextTurn = () => {
        this.props.socket.emit('nextturn', this.credentials);
    }

    enterFullscreen = () => {
        if(document.fullscreenElement) {
            if(document.exitFullscreen) document.exitFullscreen();
            if(document.webkitExitFullscreen) document.webkitExitFullscreen();
            return;
        }
        const body = document.querySelector('body');
        if(body.requestFullscreen) body.requestFullscreen();
        if(body.webkitRequestFullscreen) body.webkitRequestFullscreen();
    }

    render() {
        let content = '';
        let onConfirm;
        let textfieldPlaceholder;
        const me = this.state.players.find(player => player.id === this.credentials.playerId);
        switch(this.state.runningState.state) {
            case 'init':
                content = (
                    <div>
                        <h1>{this.props.localization.localize('main-game-page_beginning')}</h1>
                        <Button variant="primary" className="dropShadow" onClick={() => this.iWantToGoFirst()}>
                            {this.props.localization.localize('main-game-page_i-want-to-start')}
                        </Button>
                    </div>
                );
                break;
            case 'waitForHint':
                if(this.state.runningState.activePlayer === window.localStorage.getItem('diximusPlayerId')) {
                    content = (<div>
                        <h1>{this.props.localization.localize('main-game-page_beginning-of-turn',
                            this.state.runningState.currentTurn,
                            this.state.totalTurns)}</h1>
                        <h2>{this.props.localization.localize('main-game-page_choose-hint-card')}</h2>
                    </div>);
                    onConfirm = (cardId, hint) => this.giveHint(cardId, hint);
                    textfieldPlaceholder = this.props.localization.localize('main-game-page_hint-field');
                } else {
                    content = (<div>
                        <h1>{this.props.localization.localize('main-game-page_beginning-of-turn',
                            this.state.runningState.currentTurn,
                            this.state.totalTurns)}</h1>
                        <h2>{this.props.localization.localize('main-game-page_waiting')}</h2>
                    </div>);
                }
                break;
            case 'waitForCards':
                if(me?.pending) {
                    content = (<div>
                        <h1>{this.props.localization.localize('main-game-page_hint', this.state.hint)}</h1>
                        <h2>{this.props.localization.localize('main-game-page_give-card')}</h2>
                    </div>);
                    onConfirm = (cardId) => this.giveCard(cardId);
                } else {
                    content = (<div>
                        <h1>{this.props.localization.localize('main-game-page_hint', this.state.hint)}</h1>
                        <h2>{this.props.localization.localize('main-game-page_waiting')}</h2>
                    </div>);
                }
                break;
            case 'waitForGuesses':
                if(me?.pending) {
                    content = (<div>
                        <h1>{this.props.localization.localize('main-game-page_hint', this.state.hint)}</h1>
                        <h2>{this.props.localization.localize('main-game-page_choose-card')}</h2>
                    </div>);
                    onConfirm = (cardId) => this.guess(cardId);
                } else {
                    content = (<div>
                        <h1>{this.props.localization.localize('main-game-page_hint', this.state.hint)}</h1>
                        <h2>{this.props.localization.localize('main-game-page_waiting')}</h2>
                    </div>);
                }
                break;
            case 'evaluation':
                content = (<div>
                    <h1>{this.props.localization.localize('main-game-page_end-of-turn')}</h1>
                    <h2>{this.props.localization.localize('main-game-page_scoring', me.score.thisTurn)}</h2>
                    <Button variant="primary" className="dropShadow" onClick={() => this.nextTurn()}>
                        {this.props.localization.localize('main-game-page_next-turn')}
                    </Button>
                </div>);
                break;
            default:
                content = <Spinner animation="border"/>;
        }
        let viewer = '';
        if(this.state.viewedCard) viewer = (<CardViewer
            cards={this.state.viewedCardList}
            cardId={this.state.viewedCard}
            onClose={() => this.closeViewer()}
            onConfirm={onConfirm}
            placeholder={textfieldPlaceholder}
            localization={this.props.localization}
        />);
        const playerBoxes = [];
        for(let card of this.state.chosenCards) {
            const column = [];
            if(card.correct) {
                const owner = this.state.players.find(e => e.id === card.owner);
                if(owner) {
                    column.push(<PlayerBox player={owner} showScore={`+${owner.score.thisTurn}`} info={'crown'} key={card.owner}/>)
                }
            }
            if(card.guessedBy) {
                for(let playerId of card.guessedBy) {
                    const player = this.state.players.find(e => e.id === playerId);
                    if(player) {
                        column.push(<PlayerBox player={player} showScore={`+${player.score.thisTurn}`} key={playerId}/>);
                    }
                }
            }
            playerBoxes.push(<div className="contentColumn listColumn" key={card.id}>
                {column}
            </div>);
        }
        return(
            <div style={{position: "absolute", width: "100%", height: "100%"}}>
                <div className="tabletopContainer" style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: `translate(-50%, -50%) scale(${this.state.scale})`}}>
                    <Motion style={{bottom: spring(this.state.focusBottom)}}>
                        {interpolate =>
                        <div className="tabletop" style={{
                            width: `${width}px`,
                            height: `${tableHeight}px`,
                            top: `${-interpolate.bottom * (width - height)}px`}}>
                            <CardHand cards={this.state.chosenCards}
                                position="top"
                                onHover={(i) => this.highlightChosenCard(i)}
                                onLeave={(i) => this.unhighlightChosenCard(i)}
                                onClick={(i) => this.viewChosenCard(i)}
                                addInfo={playerBoxes}
                                addInfoWidth={256}
                                cardOwners={this.state.chosenCards?.map(card => {
                                    const name = this.state.players.find(e => e.id === card.owner)?.name;
                                    return name ? this.props.localization.localize('main-game-page_card-owner', name) : null;
                                })}/>
                            <CardHand cards={this.state.handCards}
                                position="bottom"
                                onHover={(i) => this.highlightHandCard(i)}
                                onLeave={(i) => this.unhighlightHandCard(i)}
                                onClick={(i) => this.viewHandCard(i)}/>
                            <div style={{position: "absolute", top: "50%", width: "100%", textAlign: "center", transform: "translate(0, -50%)"}}>
                                {content}
                            </div>
                        </div>}
                    </Motion>
                </div>
                <PlayerBar localization={this.props.localization} players={this.state.players}/>
                <Button variant="primary" className="bottomRightButton dropShadow" onClick={() => this.enterFullscreen()}>
                    {this.props.localization.localize('main-game-page_fullscreen')}
                </Button>
                {viewer}
            </div>
        )
    }
}

export default MainGamePage;