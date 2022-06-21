import React from "react";

import PlayerBox from "./player-box";

import "../../assets/css/layouts.css";

class Scoreboard extends React.Component {

    render() {
        const field = this.props.field;
        console.log(this.props.players);
        console.log(this.props.field);
        return(<div className="contentColumn listColumn">
            {this.props.description}
            {this.props.players?.sort((a, b) => b.score[field] - a.score[field]).map(player => (
                <PlayerBox key={player.id} player={player} showScore={player.score[field]} />
            ))}
        </div>);
    }
}

export default Scoreboard;