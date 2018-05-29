import React from 'react';
import PropTypes from 'prop-types';

const closeStyle = {
    marginTop: '-2px',
    padding: '0',
    cursor: 'pointer',
    background: '0 0',
    border: '0',
    float: 'right',
    fontSize: '21px',
    fontWeight: '700',
    lineHeight: '1',
    color: '#000',
    textShadow: '0 1px 0 #fff',
    opacity: '.2'
};

class ModalHeader extends React.Component {
    render() {
        return (
            <div className="modal-header">
                {
                    this.props.closeButton &&
                    <button type="button" style={closeStyle} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                }
                <h4 className="modal-title">{this.props.children}</h4>
            </div>
        );
    }
}

ModalHeader.defaultProps = {
    closeButton: true
};

ModalHeader.propTypes = {
    closeButton: PropTypes.bool
};

export default ModalHeader;