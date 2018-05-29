import React from 'react';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: props.show
        };
    }

    render() {
        const children = React.Children.toArray(this.props.children);

        const header = children.find(child => child.type === ModalHeader);
        const body = children.find(child => child.type === ModalBody);
        const footer = children.find(child => child.type === ModalFooter);

        return (
            <div className={"modal" + (this.props.theme || '')}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {header}
                        {body}
                        {footer}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    theme: PropTypes.oneOf(['modal-info'])
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;