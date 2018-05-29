import React from 'react';
import PropTypes from 'prop-types';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.contentRef = null;
        this.state = {
            visible: props.show
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickBackdrop);
    }

    static getDerivedStateFromProps(props, state) {
        if(props.show && !state.visible) {
            return {visible: true};
        }

        // TODO: this is temporary behavior
        if(!props.show && state.visible) {
            return {visible: false};
        }

        return null;
    }

    handleClickBackdrop = event => {
        const {closeOnBackdropClick, onCloseClick} = this.props;
        if(closeOnBackdropClick && this.state.visible && this.contentRef && !this.contentRef.contains(event.target)) {
            onCloseClick();
        }
    };

    setContentRef = element => {
        this.contentRef = element;
    };

    render() {
        const children = React.Children.toArray(this.props.children);

        let header = children.find(child => child.type === ModalHeader);
        if(header) {
            header = React.cloneElement(header, {onCloseClick: this.props.onCloseClick});
        }

        const body = children.find(child => child.type === ModalBody);
        const footer = children.find(child => child.type === ModalFooter);

        return (
            this.state.visible &&
            <div className={"modal" + (this.props.theme || '')}>
                <div className="modal-dialog">
                    <div className="modal-content" ref={this.setContentRef}>
                        {header}
                        {body}
                        {footer}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.defaultProps = {
    closeOnBackdropClick: true,
    onCloseClick: () => {},
    show: false
};

Modal.propTypes = {
    closeOnBackdropClick: PropTypes.bool,
    onCloseClick: PropTypes.func,
    show: PropTypes.bool,
    theme: PropTypes.oneOf(['modal-info'])
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;