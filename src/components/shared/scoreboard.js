import React from "react";

import PlayerBox from "./player-box";

import "../../assets/css/layouts.css";

const infos = ['first', 'second', 'third']

/**
 * A component that displays the results of the game in a tabular fashion.
 * 
 * @property {string} description A short message describing what the scores mean. Displayed above
 * the table.
 * @property {Player[]} players The players that should be evaluated
 * @property {string} field Which field of the player's score should be evaluated
 * 
 * @memberof components.shared
 */
class Scoreboard extends React.Component {

    render() {
        const field = this.props.field;
        return(<div className="contentColumn listColumn">
            {this.props.description}
            {this.props.players?.sort((a, b) => b.score[field] - a.score[field]).map((player, i) => {
                let place = i;
                while(place > 0) {
                    if(this.props.players[place - 1].score[field] > player.score[field]) break;
                    place--;
                }
                return <PlayerBox key={player.id} player={player} showScore={player.score[field]}
                    info={(place < infos.length) ? infos[place] : ''} />;
            })}
        </div>);
    }
}

export default Scoreboard;