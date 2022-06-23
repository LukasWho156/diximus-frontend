import React from 'react';
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import AvatarCustomization from "../shared/avatar-customization";
import NavBarPage from '../shared/nav-bar-page';

import { serverUrl } from '../../logic/server-url';
import '../../assets/css/layouts.css';

class CreateRoomPageComponent extends React.Component {

    playerData;

    constructor(props) {
        super(props);
        this.state = { alert: null };
    }

    componentDidMount() {
        this.props.socket.on('joinresponse', (data) => {
            if(!data.success) return;
            window.localStorage.setItem('diximusGameId', data.gameId);
            window.localStorage.setItem('diximusPlayerId', data.playerId);
            this.props.navigate(data.gameId);
        });
    }

    alert = (alert) => {
        this.setState({alert: alert});
    }

    dismissAlert = () => {
        this.setState({alert: null});
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
                <div style={{position: "absolute", bottom: "5%", left: "20%", right: "20%"}}>
                    <Alert variant={this.state.alert?.type} onClose={() => this.dismissAlert()} show={this.state.alert} dismissible>
                        {this.state.alert?.message}
                    </Alert>
                </div>
            </NavBarPage>
        );
    }

    onDataUpdated = (playerData) => {
        this.playerData = playerData;
    }

    onCreateGame = () => {
        if(!this.playerData?.name) {
            this.alert({type: 'danger', message: this.props.localization.localize('error-message_missing-name')});
            return;
        }
        axios.post(`${serverUrl}/game/create/`).then(res => {
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