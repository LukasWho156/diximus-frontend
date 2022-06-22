import React from 'react';
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import AvatarCustomization from "../shared/avatar-customization";
import NavBarPage from '../shared/nav-bar-page';

import { serverUrl } from '../../logic/server-url';
import '../../assets/css/layouts.css';

class CreateRoomPageComponent extends React.Component {

    playerData;
    maxPlayers;

    componentDidMount() {
        this.maxPlayers = 4;
        this.props.socket.on('joinresponse', (data) => {
            if(!data.success) return;
            window.localStorage.setItem('diximusGameId', data.gameId);
            window.localStorage.setItem('diximusPlayerId', data.playerId);
            this.props.navigate(data.gameId);
        })
    }

    render() {
        return (
            <NavBarPage localization={this.props.localization} forceRerender={this.props.forceRerender}>
                <h1>Diximus</h1>
                <h2>{this.props.localization.localize('create-room-page_create-new-game')}</h2>
                <AvatarCustomization
                    localization={this.props.localization}
                    onDataUpdated={(data) => this.onDataUpdated(data)}
                    maxIndices={[7, 7, 9]}
                    onEnter={() => this.onCreateGame()}/>
                <Button onClick={event => this.onCreateGame()} variant="primary" type="submit">
                    {this.props.localization.localize('create-room-page_create-new-game')}
                </Button>
            </NavBarPage>
        );
    }

    onDataUpdated = (playerData) => {
        this.playerData = playerData;
    }

    onMaxPlayersUpdated = (event) => {
        this.maxPlayers = event.target.value;
    }

    onCreateGame = () => {
        if(!this.playerData) return;
        if(!this.playerData.name) return;
        axios.post(`${serverUrl}/game/create/`, {maxPlayers: this.maxPlayers}).then(res => {
            this.props.socket.emit('join', {
                gameId: res.data.id,
                player: this.playerData,
            })
        })
    }
    
}

const CreateRoomPage = (props) => {
    return( 
        <CreateRoomPageComponent {...props} navigate={useNavigate()} />
    );
}

export default CreateRoomPage;