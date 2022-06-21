import React from "react";

import Avatar from "./avatar";

import crownImg from '../../assets/images/crown.png';
import '../../assets/css/player-box.css'

class PlayerBox extends React.Component {

    render() {
        let infoImg;
        switch(this.props.info) {
            case 'crown':
                infoImg = <img src={crownImg} alt="crown" width="32" height="32" style={{minWidth: "32px"}}/>
                break;
            default:
                //TODO
        }
        return(
            <div className="playerBox">
                <Avatar
                    size='small'
                    eyes={this.props.player.avatar.eyes}
                    hair={this.props.player.avatar.hair}
                    accessory={this.props.player.avatar.accessory}
                    color={this.props.player.avatar.color} />
                    <div className="enlarged">
                        <Avatar
                            size='large'
                            eyes={this.props.player.avatar.eyes}
                            hair={this.props.player.avatar.hair}
                            accessory={this.props.player.avatar.accessory}
                            color={this.props.player.avatar.color} />
                    </div>
                <div className="playerName">
                    {this.props.player.name} {(this.props.showScore !== undefined) ? `(${this.props.showScore})` : ''}
                </div>
                {infoImg}
            </div>
        )
    }

}

export default PlayerBox;