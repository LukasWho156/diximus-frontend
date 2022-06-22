import React from "react";
import { spring, Motion } from "react-motion";
import PlayerBox from "../shared/player-box";

//const texts = ["This", "is", "a", "test"];

const players = [
    {
        name: "Lulu",
        avatar: {eyes: 2, hair: 1, accessory: 4, color: 0}
    },
    {
        name: "Theresa",
        avatar: {eyes: 3, hair: 3, accessory: 6, color: 1}
    },
    {
        name: "Christin",
        avatar: {eyes: 1, hair: 5, accessory: 0, color: 2}
    },
    {
        name: "Selina",
        avatar: {eyes: 0, hair: 2, accessory: 3, color: 3}
    },
]

class OrderTestPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStart: 0,
        }
    }

    increment() {
        this.setState({currentStart: (this.state.currentStart + 1) % 4})
    }

    render() {
        const elements = players.map((element, i) =>
            <Motion style={{
                y: spring(((i - this.state.currentStart + 4) % 4)),
                scale: spring(i === this.state.currentStart ? 1.1 : 1)
            }}>
                {interpolate => <div style={{
                    top: interpolate.y * 90 + 25,
                    position: "absolute",
                    zIndex: -interpolate.y,
                    transform: `scale(${interpolate.scale * 100}%)`
                }} key={i}>
                    <PlayerBox player={element} />
                </div>}
            </Motion>);
        return(
            <div>
                <button onClick={() => this.increment()}>
                    Nächster Spieler
                </button>
                <div style={{position: "absolute"}}>
                    {elements}
                </div>
            </div>
        )
    }

}

export default OrderTestPage;