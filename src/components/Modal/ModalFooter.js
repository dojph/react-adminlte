import React from 'react';

class ModalFooter extends React.Component {
    render() {
        return (
            <div className="modal-footer">
                {this.props.children}
            </div>
        );
    }
}

export default ModalFooter;