import React from "react";

import leftArrowImg from '../../assets/images/left_arrow.png';
import rightArrowImg from '../../assets/images/right_arrow.png';

import '../../assets/css/arrow-column.css';
import '../../assets/css/clickable.css';

class ArrowColumn extends React.Component {

    render() {
        const children = [];
        const img = this.props.direction === 'left' ? leftArrowImg : rightArrowImg;
        for(let i = 0; i < this.props.size; i++) {
            children.push(<img src={img} alt="Left Arrow" className="clickable" onClick={() => this.props.onClick(i)} key={i} />);
        }
        return (
            <div className="arrowColumn">
                {children}
            </div>
        );
    }
}

export default ArrowColumn;