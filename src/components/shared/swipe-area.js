import React from "react";

class SwipeArea extends React.Component {

    startX;
    swipeStarted;

    constructor(props) {
        super(props);
        this.state = { deltaX: 0 }
    }

    onTouchStart = (e) => {
        if(e.touches.length > 1) {
            this.swipeStarted = false;
            this.setState({deltaX: 0});
            return;
        }
        this.swipeStarted = true;
        this.startX = e.touches[0].clientX;
    }

    onTouchMove = (e) => {
        if(!this.swipeStarted) return;
        this.setState({deltaX: e.touches[0].clientX - this.startX});
    }

    onTouchEnd = (e) => {
        this.setState({deltaX: 0})
        if(!this.swipeStarted) return;
        const dist = e.changedTouches[0].clientX - this.startX;
        const cutoff = window.innerWidth * 0.1;
        if(dist < -cutoff) this.handleLeftSwipe();
        if(dist > cutoff) this.handleRightSwipe();
    }

    handleLeftSwipe = () => {
        if(typeof(this.props.onSwipeLeft) === 'function') this.props.onSwipeLeft();
    }

    handleRightSwipe = () => {
        if(typeof(this.props.onSwipeRight) === 'function') this.props.onSwipeRight();
    }

    render() {
        return(<div onTouchStart={e => this.onTouchStart(e)} onTouchEnd={e => this.onTouchEnd(e)} onTouchMove={e => this.onTouchMove(e)}
            style={{width: '100%', height: '100%', transform: `translate(${this.state.deltaX}px, 0px)`}}>
            {this.props.children}
        </div>);
    }

}

export default SwipeArea;