import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import NavBarPage from "../shared/nav-bar-page";
import { serverUrl } from "../../logic/server-url";

class DeckGalleryPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { decks: [] };
    }

    componentDidMount() {
        axios.get(`${serverUrl}/sets`).then(res => {
            this.setState({ decks: res.data });
        })
    }

    goToGallery = (id) => {
        this.props.navigate(id);
    }

    render() {
        return (<NavBarPage localization={this.props.localization} forceRerender={this.props.forceRerender}>
            <h1>{this.props.localization.localize('deck-gallery-page_header')}</h1>
            <Table striped hover style={{width: '90%'}}>
                <thead>
                    <tr>
                        <th>{this.props.localization.localize('deck-gallery-page_name')}</th>
                        <th>{this.props.localization.localize('deck-gallery-page_artist')}</th>
                        <th>{this.props.localization.localize('deck-gallery-page_description')}</th>
                        <th>{this.props.localization.localize('deck-gallery-page_cards')}</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.decks.map(deck => <tr key={deck._id} style={{cursor: "pointer"}} onClick={() => this.goToGallery(deck._id)}>
                        <td>
                            <Link to={`${deck._id}`}>{deck.name}</Link>
                        </td>
                        <td>{deck.artist}</td>
                        <td>{this.props.localization.localizeObject(deck.description)}</td>
                        <td>{deck.noCards}</td>
                    </tr>)}
                </tbody>
            </Table>
        </NavBarPage>);
    }
}

const DeckGalleryPage = (props) => {
    return( 
        <DeckGalleryPageComponent {...props} navigate={useNavigate()} />
    );
}

export default DeckGalleryPage;