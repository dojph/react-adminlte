import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {
        return (
            <h1>
                {this.props.title}
                {
                    this.props.subtitle &&
                    <small className="margin-r-5">{this.props.subheader}</small>
                }
            </h1>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string
};

export default Header;