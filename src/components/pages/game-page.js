import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import JoinRoomPage from "./join-room-page";
import { serverUrl } from "../../logic/server-url";
import LobbyPage from "./lobby-page";
import MainGamePage from "./main-game-page";
import { Spinner } from "react-bootstrap";
import FinishedPage from "./finished-page";

class GamePageComponent extends React.Component {

    gameRunning;

    constructor(props) {
        super(props);
        this.state = {
            gameState: 'pending',
            cards: [],
        }
    }

    componentDidMount() {
        axios.get(`${serverUrl}/game/state/${this.props.params.id}`).then(res => {
            console.log(res.data);
            switch(res.data.state) {
                case 'invalid':
                    this.setState({gameState: 'doesNotExist'});
                    break;
                case 'open':
                    this.evaluateLobby();
                    break;
                case 'running':
                    this.evaluateRunning();
                    break;
                case 'finished':
                    this.setState({ gameState: 'finished' });
                    break;
                default:
                    this.setState({gameState: 'unknown'});
            }
        });
        this.props.socket.on('reconnectresponse', (data) => {
            console.log('Reconnected', data);
            if(!data.success) {
                this.setState({ gameState: (this.gameRunning) ? 'locked' : 'joining' })
                return;
            }
            this.setState({ gameState: (this.gameRunning) ? 'running' : 'lobby' })
        })
        this.props.socket.on('gamestarted', (data) => {
            this.setState({ gameState: 'running' });
        });
        this.props.socket.on('gamefinished', (data) => {
            this.setState({ gameState: 'finished' });
        });
        this.props.socket.on('gamerestarted', (data) => {
            console.log('Restarted!');
            this.setState({ gameState: 'lobby' });
        });
        this.props.socket.on('disconnect', (data) => {
            this.setState({ gameState: 'serverError' });
        });
        setTimeout(() => this.stopLoading(), 3000);
    }

    evaluateLobby() {
        const playerId = window.localStorage.getItem('diximusPlayerId');
        this.gameRunning = false;
        this.props.socket.emit('reconnect', {gameId: this.props.params.id, playerId: playerId})
    }

    evaluateRunning() {
        const playerId = window.localStorage.getItem('diximusPlayerId');
        this.gameRunning = true;
        this.props.socket.emit('reconnect', {gameId: this.props.params.id, playerId: playerId})
    }

    stopLoading() {
        if(this.state.gameState === 'pending') this.setState({ gameState: 'serverError' })
    }

    render() {
        switch(this.state.gameState) {
            case 'pending':
                return(<Spinner animation="border" />);
            case 'doesNotExist':
                return(<h2>{this.props.localization.localize('game-page_room-does-not-exist')}</h2>);
            case 'joining':
                return <JoinRoomPage
                    localization={this.props.localization}
                    socket={this.props.socket}
                    params={this.props.params}
                    onSuccessfulJoin={() => this.setState({gameState: 'lobby'})}/>;
            case 'lobby':
                return <LobbyPage localization={this.props.localization} socket={this.props.socket} params={this.props.params} />;
            case 'locked':
                return <h2>{this.props.localization.localize('game-page_game-in-progress')}</h2>
            case 'running':
                return <MainGamePage
                    localization={this.props.localization}
                    socket={this.props.socket}
                    params={this.props.params}/>;
            case 'finished':
                return <FinishedPage
                    localization={this.props.localization}
                    socket={this.props.socket}
                    params={this.props.params}/>;
            case 'serverError':
                return (<div style={{textAlign: "center"}}>
                    <h1>{this.props.localization.localize('game-page_server-problems')}</h1>
                    <h2>{this.props.localization.localize('game-page_please-retry')}</h2>
                </div>)
            default:
                return(<h2>I have no idea how you managed to get here.</h2>);
        }
    }

}

const GamePage = (props) => {
    return( 
        <GamePageComponent {...props} params={useParams()} />
    );
}

export default GamePage;