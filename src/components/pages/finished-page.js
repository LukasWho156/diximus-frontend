import React from "react";
import { Button, Tab, Tabs, } from "react-bootstrap";

import Avatar from "../shared/avatar";
import Scoreboard from "../shared/scoreboard";
import CrossTable from "../shared/cross-table";

import "../../assets/css/tooltip.css";
import NavBarPage from "../shared/nav-bar-page";

class FinishedPage extends React.Component {

    credentials;

    constructor(props) {
        super(props);
        this.state = { players: [], guessBoard: [], topTeams: [], topScore: 0, };
        this.credentials = {
            gameId: this.props.params.id,
            playerId: window.localStorage.getItem('diximusPlayerId')
        }
    }

    componentDidMount() {
        this.props.socket.emit('getplayers', this.credentials);
        this.props.socket.on('playerresponse', (data) => {
            if(!data.success) return;
            const playerIds = data.players.map(player => player.id);
            const guessBoard = data.players.map(player => ({
                heading: <div className="tooltipContainer">
                        <span className="tooltip">{player.name}</span>
                        <Avatar eyes={player.avatar.eyes} hair={player.avatar.hair} accessory={player.avatar.accessory}
                            color={player.avatar.color} size="small"/>
                    </div>,
                scores: playerIds.map(id => id in player.guesses ? player.guesses[id] : 'X'),
            }))
            let topTeams = [];
            let topScore = 0;
            for(let i = 0; i < data.players.length; i++) {
                for(let j = i + 1; j < data.players.length; j++) {
                    const teamScore = guessBoard[i].scores[j] + guessBoard[j].scores[i];
                    if(teamScore > topScore) {
                        topTeams = [{player1: data.players[i].name, player2: data.players[j].name}];
                        topScore = teamScore
                    } else if(teamScore === topScore) {
                        topTeams.push({player1: data.players[i].name, player2: data.players[j].name});
                    }
                }
            }
            this.setState({ players: data.players, guessBoard: guessBoard, topTeams: topTeams, topScore: topScore });
        })
    }

    restartGame = () => {
        this.props.socket.emit('restartgame', this.credentials);
    }

    renderDreamTeamDiv() {
        if(this.state.topTeams.length === 1) {
            return <div style={{width: '30%', paddingTop: '5em'}}>
                {this.props.localization.localize('finished-page_dream-team-desc',
                    this.state.topTeams[0].player1, this.state.topTeams[0].player2, this.state.topScore)}
            </div>
        }
        return <div style={{width: '30%', paddingTop: '5em'}}>
            {this.props.localization.localize('finished-page_dream-team-desc-multi', this.state.topScore)}
            <ul>
                {this.state.topTeams.map(team => <li>{team.player1} &amp; {team.player2}</li>)}
            </ul>
        </div>
    }

    render() {
        return(<NavBarPage localization={this.props.localization} forceRerender={this.props.forceRerender}>
            <h1>Diximus</h1>
            <h2>{this.props.localization.localize('finished-page_game-over')}</h2>
            <Button variant="primary" onClick={() => this.restartGame()}>
                {this.props.localization.localize('finished-page_start-new-game')}
            </Button>
            <hr className="separator"/>
            <h2>{this.props.localization.localize('finished-page_scoreboard')}</h2>
            <Tabs id="score-tabs" className="mb-3">
                <Tab eventKey="total" title={this.props.localization.localize('finished-page_total-score')}>
                    <Scoreboard players={this.state.players} field="total" />
                </Tab>
                <Tab eventKey="hints" title={this.props.localization.localize('finished-page_most-poetic')}>
                    <Scoreboard players={this.state.players} field="throughGoodHints"
                        description={this.props.localization.localize('finished-page_most-poetic-desc')}/>
                </Tab>
                <Tab eventKey="guesses" title={this.props.localization.localize('finished-page_most-empathic')}>
                    <Scoreboard players={this.state.players} field="throughGoodGuesses"
                        description={this.props.localization.localize('finished-page_most-empathic-desc')}/>
                </Tab>
                <Tab eventKey="cards" title={this.props.localization.localize('finished-page_most-cunning')}>
                    <Scoreboard players={this.state.players} field="throughGoodCards"
                        description={this.props.localization.localize('finished-page_most-cunning-desc')}/>
                </Tab>
                <Tab eventKey="cross" title={this.props.localization.localize('finished-page_dream-team')}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '3em'}}>
                        <CrossTable entries={this.state.guessBoard}
                            columnHeading={this.props.localization.localize('finished-page_dream-team-column')}
                            rowHeading={this.props.localization.localize('finished-page_dream-team-row')}/>
                        {this.renderDreamTeamDiv()}
                    </div>
                </Tab>
            </Tabs>
        </NavBarPage>);
    }
}

export default FinishedPage;