import React from 'react';
import PropTypes from ''

class ModalBody extends React.Component {
    render() {
        return (
            <div className="modal-body">
                {this.props.children}
            </div>
        );
    }
}

ModalBody.propTypes = {
    style
};

export default ModalBody;