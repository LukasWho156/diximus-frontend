import React from "react";
import PlayerBox from "../shared/player-box";

class FinishedPage extends React.Component {

    credentials;

    constructor(props) {
        super(props);
        this.state = { players: [] };
        this.credentials = {
            gameId: this.props.params.id,
            playerId: window.localStorage.getItem('diximusPlayerId')
        }
    }

    componentDidMount() {
        this.props.socket.emit('getplayers', this.credentials);
        this.props.socket.on('playerresponse', (data) => {
            if(!data.success) return;
            this.setState({ players: data.players.sort((a, b) => b.totalScore - a.totalScore) });
        })
    }

    render() {
        return(<div className="contentColumn">
            <h1>Diximus</h1>
            <h2>{this.props.localization.localize('finished-page_game-over')}</h2>
            <div className="contentColumn listColumn">
                {this.state.players?.map(player => (
                    <PlayerBox key={player.id} player={player} showScore={player.totalScore} />
                ))}
            </div>
        </div>);
    }
}

export default FinishedPage;