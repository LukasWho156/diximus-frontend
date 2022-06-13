import React from 'react';

import '../../assets/css/avatar.css'
import { serverUrl } from '../../logic/server-url';

class Avatar extends React.Component {

    componentDidMount() {
    }

    render() {
        let className = 'avatarLarge';
        if(this.props.size === 'small') className = 'avatarSmall';
        const address = `${serverUrl}/avatar/${this.props.eyes}/${this.props.hair}/${this.props.accessory}/${this.props.color}`;
        return (
            <img src={address} alt="Avatar" className={className} />
        );
    }

}

export default Avatar;