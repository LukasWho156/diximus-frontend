import React from 'react';
import Button from "react-bootstrap/Button";

import AvatarCustomization from "../shared/avatar-customization";

import '../../assets/css/layouts.css';

class JoinRoomPage extends React.Component {

    playerData;

    componentDidMount() {
        this.props.socket.on('joinresponse', (data) => {
            console.log('Hi!', data);
            if(!data.success) return;
            window.localStorage.setItem('diximusGameId', data.gameId);
            window.localStorage.setItem('diximusPlayerId', data.playerId);
            if(typeof(this.props.onSuccessfulJoin) === 'function') this.props.onSuccessfulJoin();
        });
    }

    render() {
        return (
            <div className="contentColumn">
                <h1>Diximus</h1>
                <h2>{this.props.localization.localize('join-room-page_join-game')}</h2>
                <AvatarCustomization
                    localization={this.props.localization}
                    onDataUpdated={(data) => this.onDataUpdated(data)}
                    maxIndices={[7, 7, 9]}
                    onEnter={() => this.onJoinGame()}/>
                <Button onClick={(event) => this.onJoinGame(event)} variant="primary">
                    {this.props.localization.localize('join-room-page_join-game')}
                </Button>
            </div>
        );
    }

    onDataUpdated = (playerData) => {
        this.playerData = playerData;
    }

    onJoinGame = () => {
        if(!this.playerData) return;
        if(!this.playerData.name) return;
        this.props.socket.emit('join', {
            gameId: this.props.params.id,
            player: this.playerData,
        })
    }
    
}

export default JoinRoomPage;