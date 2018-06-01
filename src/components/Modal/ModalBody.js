import React from 'react';

class ModalBody extends React.Component {
    render() {
        return (
            <div className="modal-body">
                {this.props.children}
            </div>
        );
    }
}

export default ModalBody;