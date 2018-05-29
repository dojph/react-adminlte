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

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.body.classList.toggle('modal-open', this.props.show && !prevState.visible);
    }

    handleClickBackdrop = () => {
        const {closeOnBackdropClick, onCloseClick} = this.props;
        if(closeOnBackdropClick && this.state.visible) {
            onCloseClick();
        }
    };

    handleInnerClick = event => {
        event.stopPropagation();
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
            <div className={"modal" + (this.props.theme || '')} onClick={this.handleClickBackdrop}>
                <div className="modal-dialog" onClick={this.handleInnerClick}>
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