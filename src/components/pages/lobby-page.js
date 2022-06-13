import React from "react";
import axios from "axios";
import { Button, Form, FormControl, FormLabel, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

import PlayerBox from "../shared/player-box";
import { serverUrl, frontendUrl } from "../../logic/server-url";

import "../../assets/css/layouts.css";
import GameSettings from "../shared/game-settings";

class LobbyPage extends React.Component {

    credentials;

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            capacity: 0,
            link: `${frontendUrl}/${this.props.params.id}`,
            availableSets: [],
            noRounds: 5,
            currentNoCards: 0,
            requiredNoCards: 0,
            alert: null,
            buttonEnabled: false,
            requestSent: false,
        }
        this.credentials = {
            gameId: this.props.params.id,
            playerId: window.localStorage.getItem('diximusPlayerId')
        }
    }

    componentDidMount() {
        axios.get(`${serverUrl}/game/players/${this.props.params.id}`).then(res => {
            this.setState(state => ({
                players: res.data.players,
                requiredNoCards: res.data.players.length * (5 + state.noRounds),
            }));
        });
        axios.get(`${serverUrl}/sets`).then(res => {
            this.setState({availableSets: res.data});
        });
        this.props.socket.on('playerjoined', (data) => {
            console.log('Player joined', data);
            this.setState(state => ({
                players: data.players,
                requiredNoCards: data.players.length * (5 + state.noRounds),
            }));
        })
    }

    alert = (alert) => {
        this.setState({alert: alert});
    }

    dismissAlert = () => {
        this.setState({alert: null});
    }

    isButtonEnabled = (state) => {
        if(!state.players.find(e => e.id === this.credentials.playerId)?.admin) return false;
        if(state.players.length < 2) return false;
        if(state.currentNoCards < state.requiredNoCards) return false;
        if(state.requestSent) return false;
        return true;
    }

    copyLink = () => {
        navigator.clipboard.writeText(this.state.link);
        this.alert({
            message: this.props.localization.localize('lobby-page_link-copied'),
            type: 'info',
        })
    }

    onNoRoundsChanged = (e) => {
        this.setState(state => ({
            noRounds: Number.parseInt(e.target.value),
            requiredNoCards: state.players.length * (5 + Number.parseInt(e.target.value)),
        }), () => this.setState(state => ({buttonEnabled: this.isButtonEnabled(state)})));
    }

    onDeckSelected = (e, setId) => {
        this.setState(state => {
            const set = state.availableSets.find(e => e._id === setId);
            if(!set) return;
            console.log(e.target.checked);
            set.selected = e.target.checked;
            let selectedCards = 0;
            for(let set of state.availableSets) {
                if(set.selected) selectedCards += set.noCards;
            }
            return {
                availableSets: state.availableSets,
                currentNoCards: selectedCards,
            }
        }, () => this.setState(state => ({buttonEnabled: this.isButtonEnabled(state)})));
    }
    
    onGameStart = (e) => {
        e.preventDefault();
        const noRoundsField = document.querySelector('#noRounds');
        this.props.socket.emit('startgame', {
            ...this.credentials,
            noRounds: noRoundsField.value,
            selectedSets: this.state.availableSets.filter(e => e.selected).map(e => e._id),
        });
        this.setState({
            buttonEnabled: false,
            requestSent: true,
        })
        setTimeout(() => {
            this.alert({
                message: this.props.localization.localize('server-error_timeout'),
                type: 'danger',
            });
            this.setState({requestSent: false}, () => this.setState(state => ({buttonEnabled: this.isButtonEnabled(state)})))
        }, 3000);
    }

    render() {
        const playerBoxes = this.state.players.map((player, i) => <PlayerBox player={player} key={i} info={player.admin ? 'crown' : null}/>)
        const me = this.state.players.find(e => e.id === this.credentials.playerId);
        const settings = me?.admin ? <GameSettings
            localization={this.props.localization}
            onNoRoundsChanged={(e) => this.onNoRoundsChanged(e)}
            selectDeck={(e, setId) => this.onDeckSelected(e, setId)}
            availableSets={this.state.availableSets}
            missingCards={this.state.requiredNoCards - this.state.currentNoCards} />
            : <h2>{this.props.localization.localize('lobby-page_wait-for-admin')}</h2>;
        return(
            <div style={{position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Container style={{width: "70%", overflowY: "auto", overflowX: "hidden"}}>
                    <Row>
                        <Col>
                            <h1>{this.props.localization.localize('lobby-page_heading')}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" style={{width: "100%"}}>
                                <FormLabel>{this.props.localization.localize('lobby-page_copy-link-label')}</FormLabel>
                                <div style={{display: "flex"}}>
                                    <FormControl type="text" value={this.state.link} readOnly></FormControl>
                                    <Button variant="secondary" style={{width: "max-content", whiteSpace: "nowrap"}}
                                        onClick={() => this.copyLink()}>
                                        {this.props.localization.localize('lobby-page_copy-link')}
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{height: "5em"}}></div>
                        </Col>
                    </Row>
                    <Form onSubmit={(e) => this.onGameStart(e)}>
                        <Row>
                            <Col>
                                <h2>{this.props.localization.localize('player-bar_players')}</h2>
                                <div className="contentColumn listColumn">
                                    {playerBoxes}
                                </div>
                            </Col>
                            <Col>{settings}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={{height: "2.5em"}}></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{textAlign: "center"}}>
                                <Button variant="primary" type="submit" style={{width: "50%"}} disabled={!this.state.buttonEnabled}>
                                    {this.props.localization.localize('lobby-page_start-game')}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <div style={{position: "absolute", bottom: "5%", left: "20%", right: "20%"}}>
                    <Alert variant={this.state.alert?.type} onClose={() => this.dismissAlert()} show={this.state.alert} dismissible>
                        {this.state.alert?.message}
                    </Alert>
                </div>
            </div>
        );
    }

}

export default LobbyPage