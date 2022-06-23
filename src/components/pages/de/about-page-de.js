import React from "react";
import { Table } from "react-bootstrap";

import "../../../assets/css/layouts.css";

class AboutPageDe extends React.Component {

    render() {
        return (<div className="contentColumn" style={{width: "60%"}}>
                <h1>Spielregeln</h1>
                <p className="poem">
                    Ihr möchtet wissen, wie das Spiel funktioniert?<br/>
                    Dann hört gut zu, wir sagen es euch ungeniert.<br/>
                    Zunächst bestimmt ihr den Rundenleiter<br/>
                    Dann geht das Spiel auch ganz fix weiter.
                </p>
                <p className="poem">
                    Er nennt einen Begriff, der eine Karte beschreibt<br/>
                    Doch so, dass Interpretationsspielraum bleibt.<br/>
                    Denn erkennt seine Karte jeder oder keiner<br/>
                    Gibt's für ihn keine Punkte &ndash; leider.
                </p>
                <p className="poem">
                    Als nächstes sind die anderen Spieler dran:<br/>
                    Sie wählen selbst eine Karte sodann.<br/>
                    Zum Begriff soll sie möglichst gut passen,<br/>
                    Dass andere sich täuschen lassen.
                </p>
                <p className="poem">
                    Die Karten werden durchgemischt<br/>
                    Und dann auch ganz schnell aufgetischt.<br/>
                    Jetzt beginnt die Raterei:<br/>
                    Kam vom Leiter die eins, zwei, oder drei?
                </p>
                <p className="poem">
                    Hat jeder einen Tipp gegeben<br/>
                    Dann schaut: Liegt ihr richtig oder daneben?<br/>
                    Jetzt beginnt die Punkteverteilerei,<br/>
                    Dann ist der nächste Spieler an der Reih'.
                </p>
                <Table>
                    <thead>
                        <tr>
                            <th>Rolle</th>
                            <th>Situation</th>
                            <th>Punkte</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th rowSpan={3}>Spielleiter</th>
                            <td>Niemand hat auf deine Karte getippt.</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Jeder hat auf deine Karte getippt.</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>Manche, aber nicht alle haben auf deine Karte getippt.</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <th rowSpan={4}>Ratender</th>
                            <td>Niemand hat auf die Karte des Spielleiters getippt.</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Jeder hat auf die Karte des Spielleiters getippt.</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Du hast auf die Karte des Spielleiters getippt, aber nicht alle deine Mitspieler.</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>Für jeden Mitspieler, der auf deine Karte getippt hat:</td>
                            <td>+1</td>
                        </tr>
                    </tbody>
                </Table>
        </div>)
    }
}


export default AboutPageDe;