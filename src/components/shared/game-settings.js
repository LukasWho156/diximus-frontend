import React from "react";
import { Form, FormLabel, FormControl, Spinner } from "react-bootstrap";

class GameSettings extends React.Component {

    render() {
        return (<div>
            <h2>{this.props.localization.localize('game-settings_header')}</h2>
            <Form.Group className="mb-3" controlId="noRounds" style={{width: "100%"}}>
                <FormLabel>{this.props.localization.localize('game-settings_no-turns')}</FormLabel>
                <FormControl type="number" min={3} max={50} defaultValue={5} onChange={(e) => this.props.onNoRoundsChanged(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="selectedSets" style={{width: "100%"}}>
                <FormLabel>Kartensets:</FormLabel>
                {this.props.availableSets.length > 0 ? this.props.availableSets.map(set => {
                    return <Form.Check key={set._id} label={`${set.name} (${set.noCards})`}
                        onChange={(e) => this.props.selectDeck(e, set._id)} />;
                }) : <div><Spinner animation="border" /></div>}
                {(this.props.missingCards > 0) ? <div>
                    {this.props.localization.localize('game-settings_missing-cards', this.props.missingCards)}
                </div> : <div>{this.props.localization.localize('game-settings_enough-cards')}</div>}
            </Form.Group>
        </div>)
    }
}

export default GameSettings;