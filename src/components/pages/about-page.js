import React from "react";

import NavBarPage from "../shared/nav-bar-page";
import AboutPageDe from "./de/about-page-de";
import AboutPageEn from "./en/about-page-en";

class AboutPage extends React.Component {

    renderInner() {
        switch(this.props.localization.language) {
            case 'de':
                return <AboutPageDe />
            default:
                return <AboutPageEn />
        }
    }

    render() {
        return <NavBarPage localization={this.props.localization} forceRerender={this.props.forceRerender}>
            {this.renderInner()}
        </NavBarPage>
    }
}


export default AboutPage;