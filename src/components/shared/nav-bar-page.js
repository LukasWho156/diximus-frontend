import React from "react";

import NavigationBar from "./navigation-bar";

import "../../assets/css/layouts.css";

class NavBarPage extends React.Component {

    render() {
        return(<div className="scrollablePage">
            <NavigationBar localization={this.props.localization} forceRerender={this.props.forceRerender} />
            {this.props.children}
        </div>)
    }
}

export default NavBarPage;