import React from 'react';

class HoldButton extends React.Component {
    constructor(props) {
        super(props);

        this.holdTimeout = null;
        this.holdInterval = null;
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseUp = () => {
        this.clearTimers();
    };

    clearTimers = () => {
        if(this.holdTimeout) {
            clearTimeout(this.holdTimeout);
            this.holdTimeOut = null;

            if(this.holdInterval) {
                clearInterval(this.holdInterval);
                this.holdInterval = null;
            }
        }
    };

    handleMouseDown = () => {
        this.props.onClick();
        this.clearTimers();

        this.holdTimeout = setTimeout(() => {
            this.holdInterval = setInterval(() => {
                this.props.onClick();
            }, 80);
        }, 260);
    };

    render() {
        const {className, style, children} = this.props;

        return (
            <button className={className} style={style} onMouseDown={this.handleMouseDown}>{children}</button>
        );
    }
}

HoldButton.defaultProps = {
    className: undefined,
    style: undefined,
    onClick: undefined
};

export default HoldButton;