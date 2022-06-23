import React from "react";
import { Table } from "react-bootstrap";

import "../../../assets/css/layouts.css";

class AboutPageEn extends React.Component {

    render() {
        return (<div className="contentColumn" style={{width: "60%"}}>
                <h1>Rules</h1>
                <p className="poem">
                    You wonder: How does this game work?<br/>
                    Let me tell you, my little nerd:<br/>
                    First, appoint the leader of the round<br/>
                    With their skill set they can then astound.
                </p>
                <p className="poem">
                    They pick a term to describe their card,<br/>
                    Don't make it too easy or too hard.<br/>
                    'cause if it's guessed by all or none<br/>
                    It's zero points &ndash; that's not much fun.
                </p>
                <p className="poem">
                    Now it's the other players' turn:<br/>
                    Pick a card that fits the term.<br/>
                    If you can fool some of your mates<br/>
                    You earn some points through their mistakes.
                </p>
                <p className="poem">
                    All cards are shuffled thoroughly<br/>
                    Then put in the middle so all can see<br/>
                    Now let's start the guessing game:<br/>
                    What card belongs to the round leader's name?
                </p>
                <p className="poem">
                    Once everyone has made a guess<br/>
                    See if you're right: No or yes?<br/>
                    Evaluate each player's score<br/>
                    And after that, let's play some more!
                </p>
                <Table>
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Situation</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th rowSpan={3}>Round leader</th>
                            <td>No one has guessed your card.</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Everyone has guessed your card.</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Some, but not all players have guessed your card.</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <th rowSpan={4}>Guessing player</th>
                            <td>No one has guessed the round leader's card.</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Everyone has guessed the round leader's card.</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>You have guessed the round leader's card, but at least one other player hasn't.</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>For each player who guessed your card:</td>
                            <td>+1</td>
                        </tr>
                    </tbody>
                </Table>
        </div>)
    }
}


export default AboutPageEn;