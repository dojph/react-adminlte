import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

import './styles.css';

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            mounted: false
        };
    }

    componentDidMount() {
        this.setState({mounted: true});
    }

    static getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    handleClickBackdrop = () => {
        const {closeOnBackdropClick, onCloseClick} = this.props;
        if(closeOnBackdropClick) {
            onCloseClick();
        }
    };

    handleInnerClick = event => {
        event.stopPropagation();
    };

    handleEnter = () => {
        const scrollbarWidth = Modal.getScrollbarWidth();
        document.body.classList.add('modal-open');
        if(scrollbarWidth) {
            document.body.style.paddingRight = scrollbarWidth + 'px';
        }
        this.props.onEnter();
    };

    handleExited = () => {
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = null;
        this.props.onExit();
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
            <CSSTransition
                in={this.state.mounted && this.props.show}
                timeout={150}
                classNames="modal"
                onEnter={this.handleEnter}
                onExited={this.handleExited}
                unmountOnExit
            >
                {
                    state => (
                        <div className={"modal " + (this.props.className || '')} onClick={this.handleClickBackdrop}>
                            <CSSTransition
                                in={(state === 'entering' || state === 'entered')}
                                timeout={300}
                                classNames={'modal-dialog'}
                                unmountOnExit
                            >
                                <div className="modal-dialog" onClick={this.handleInnerClick}>
                                    <div className="modal-content">
                                        {header}
                                        {body}
                                        {footer}
                                    </div>
                                </div>
                            </CSSTransition>
                        </div>
                    )
                }
            </CSSTransition>
        );
    }
}

Modal.defaultProps = {
    closeOnBackdropClick: true,
    onCloseClick: () => {},
    onEnter: () => {},
    onExit: () => {},
    show: false
};

Modal.propTypes = {
    closeOnBackdropClick: PropTypes.bool,
    onCloseClick: PropTypes.func,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    show: PropTypes.bool,
    className: PropTypes.string
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;