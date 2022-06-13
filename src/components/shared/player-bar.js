import React from "react";
import { Button, Offcanvas, OffcanvasHeader } from "react-bootstrap";

import PlayerBox from "./player-box";

import "../../assets/css/clickable.css";
import "../../assets/css/layouts.css";

class PlayerBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    render() {
        return(<div className="topRightButton">
            <Offcanvas show={this.state.show} placement="end" className="playerBar" onHide={() => this.setState({show: false})}>
                <OffcanvasHeader closeButton><h1>{this.props.localization.localize('player-bar_players')}</h1></OffcanvasHeader>
                <div className="contentColumn listColumn">
                    {this.props.players?.map(player => (
                        <PlayerBox key={player.id} player={player} showScore={player.totalScore} />
                    ))}
                </div>
            </Offcanvas>
            <Button variant="success" className="topRightButton dropShadow" onClick={() => this.setState({show: true})}>
                {this.props.localization.localize('player-bar_players')}
            </Button>
        </div>)
    }
}

export default PlayerBar