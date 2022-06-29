import React from "react";

import Avatar from "./avatar";

import crownImg from '../../assets/images/crown.png';
import tickImg from '../../assets/images/tick.png';
import waitImg from '../../assets/images/hourglass.png';
import goldImg from '../../assets/images/firstplace.png';
import silverImg from '../../assets/images/secondplace.png';
import bronzeImg from '../../assets/images/thirdplace.png';
import disconnectedImg from '../../assets/images/disconnected.png';

import '../../assets/css/player-box.css'

class PlayerBox extends React.Component {

    render() {
        let infoImg;
        switch(this.props.info) {
            case 'crown':
                infoImg = <img src={crownImg} alt="crown" width="32" height="32" style={{minWidth: "32px"}}/>
                break;
            case 'ready':
                infoImg = <img src={tickImg} alt="tick" width="32" height="32" style={{minWidth: "32px"}}/>
                break;
            case 'pending':
                infoImg = <img src={waitImg} alt="hourglass" width="32" height="32" style={{minWidth: "32px"}}/>
                break;
            case 'first':
                infoImg = <img src={goldImg} alt="gold medal" width="32" height="32" style={{minWidth: "32px"}}/>
                break;
            case 'second':
                infoImg = <img src={silverImg} alt="silver medal" width="32" height="32" style={{minWidth: "32px"}}/>
                break;
            case 'third':
                infoImg = <img src={bronzeImg} alt="bronze medal" width="32" height="32" style={{minWidth: "32px"}}/>
                break;
            case 'disconnected':
                infoImg = <img src={disconnectedImg} alt="disconnected" width="32" height="32" style={{minWidth: "32px"}}/>
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