import React from "react";

import NavBarPage from "../shared/nav-bar-page";
import ContactPageDe from "./de/contact-page-de";
import ContactPageEn from "./en/contact-page-en";

import { version } from "../../logic/server-url";

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
            <div className="copyrightInfo">
                Diximus v.{version}<br/>
                Copyright © 2022 Gute LuThe Games
            </div>
        </NavBarPage>
    }
}


export default ContactPage;