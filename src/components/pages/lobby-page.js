import React from "react";
import axios from "axios";

import PlayerBox from "../shared/player-box";
import serverUrl from "../../logic/server-url";

import "../../assets/css/layouts.css";
import Button from "react-bootstrap/esm/Button";
import { Form, FormControl, FormLabel } from "react-bootstrap";

class LobbyPage extends React.Component {

    credentials;

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            capacity: 0,
        }
        this.credentials = {
            gameId: this.props.params.id,
            playerId: window.localStorage.getItem('diximusPlayerId')
        }
    }

    componentDidMount() {
        axios.get(`${serverUrl}/game/players/${this.props.params.id}`).then(res => {
            this.setState({players: res.data.players, capacity: res.data.maxPlayers});
        })
        this.props.socket.on('playerjoined', (data) => {
            console.log('Player joined', data);
            this.setState({players: data.players});
        })
    }
    
    onGameStart = (e) => {
        e.preventDefault();
        const noRoundsField = document.querySelector('#noRounds');
        this.props.socket.emit('startgame', {
            ...this.credentials,
            noRounds: noRoundsField.value,
        })
    }

    render() {
        const playerBoxes = this.state.players.map((player, i) => <PlayerBox player={player} key={i} info={player.admin ? 'crown' : null}/>)
        const me = this.state.players.find(e => e.id === this.credentials.playerId);
        let startGame = <h2>Warte auf Administrator ...</h2>;
        if(me?.admin) {
            startGame = <Form className="contentColumn" style={{width: "100%"}} onSubmit={(e) => this.onGameStart(e)}>
                <Form.Group className="mb-3" controlId="noRounds" style={{width: "100%"}}>
                    <FormLabel>Anzahl Runden:</FormLabel>
                    <FormControl type="number" min={3} max={20} defaultValue={5}></FormControl>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {this.props.localization.localize('lobby-page_start-game')}
                </Button>
            </Form>
        }
        return(
            <div className="contentColumn">
                <h1>{this.props.localization.localize('lobby-page_heading')}</h1>
                <div className="contentColumn listColumn">
                    {playerBoxes}
                </div>
                {startGame}
            </div>
        );
    }

}

export default LobbyPage