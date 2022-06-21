import React from "react";

import NavBarPage from "../shared/nav-bar-page";
import ContactPageDe from "./contact-page-de";
import ContactPageEn from "./contact-page-en";

class ContactPage extends React.Component {

    renderInner() {
        switch(this.props.localization.language) {
            case 'de':
                return <ContactPageDe />
            default:
                return <ContactPageEn />
        }
    }

    render() {
        return <NavBarPage localization={this.props.localization} forceRerender={this.props.forceRerender}>
            {this.renderInner()}
        </NavBarPage>
    }
}


export default ContactPage;