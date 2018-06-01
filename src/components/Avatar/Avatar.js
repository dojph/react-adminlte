import React from 'react';
import PropTypes from 'prop-types';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInitials: this.constructor.prepareInitials(props.firstName, props.lastName)
        };
    }

    static prepareInitials(firstName, lastName) {
        let initial = firstName.substr(0, 1);

        if(lastName) {
            if (lastName.startsWith("dela ")) {
                initial += lastName.substr(4, 2);
            } else if (lastName.startsWith("de la ")) {
                initial += lastName.substr(5, 2);
            } else if (lastName.startsWith("de ")) {
                initial += lastName.substr(2, 2);
                console.log(initial);
            } else {
                initial += lastName.substr(0, 1);
            }
        }

        return initial;
    }



    renderInitials = () => {
        const initialStyle = {
            display: 'inline-block',
            color: 'white',
            backgroundColor: 'rgb(0, 191, 239)',
            width: `${this.props.size}px`,
            height: `${this.props.size}px`,
            lineHeight: `${this.props.size}px`,
            fontSize: Math.floor(this.props.size / this.props.textSizeRatio) + 'px',
            textAlign: 'center',
            fontFamily: 'Source Sans Pro, Helvetica, Arial, sans-serif'
        };

        return (
            <span style={initialStyle}>
                {this.state.userInitials}
            </span>
        );
    };

    renderImage = () => {
        const imageStyle = {
            width: `${this.props.size}px`,
            height: `${this.props.size}px`
        };

        return (
            <img src={this.props.imgSrc} alt="Avatar" style={imageStyle}/>
        );
    };

    render() {
        const style = {
            ...this.props.round && {borderRadius: '50%'},
            display: 'inline-block',
            overflow: 'hidden',
            ...this.props.size && { width: `${this.props.size}px`, height: `${this.props.size}px` }
        };

        return (
            <span className="avatar-container" style={style}>
                {this.props.imgSrc ? this.renderImage() : this.renderInitials()}
            </span>
        );
    }
}

Avatar.defaultProps = {
    round: false,
    size: 200,
    textSizeRatio: 1.72
};

Avatar.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    imgSrc: PropTypes.string,
    size: PropTypes.number,
    textSizeRatio: PropTypes.number,
    round: PropTypes.bool
};

export default Avatar;