import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';

import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

import './styles.css';

const ModalBody = ({children}) => children || null;

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            mounted: false,
            fixedWidth: 0,
            fixedHeight: 0,
            fixedMaxWidth: 0
        };
    }

    static getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    componentDidMount() {
        this.setState({mounted: true});
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    updateDimensions = () => {
        // sm 300
        // def 600
        // lg 1100
        if(this.props.fixedScroll) {
            let maxWidth = 600;
            if(this.props.dialogClassName.indexOf('modal-lg') !== -1) {
                maxWidth = 1100;
            } else if(this.props.dialogClassName.indexOf('modal-sm')) {
                maxWidth = 300;
            }

            this.setState({
                fixedBodyHeight: window.innerHeight - 182,
                fixedWidth: window.innerWidth - 21,
                fixedMaxWidth: maxWidth
            });
        }
    };

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

    handleExit = () => {

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

        let dialogStyle = null, bodyStyle = null;

        if(this.props.fixedScroll && window.innerWidth < 768) {
            dialogStyle = {
                width: this.state.fixedWidth,
                maxWidth: this.state.fixedMaxWidth
            };

            bodyStyle = {
                width: '100%',
                maxHeight: this.state.fixedBodyHeight,
                overflow: 'auto'
            };
        }

        return (
            <CSSTransition
                in={this.state.mounted && this.props.show}
                timeout={150}
                classNames="modal"
                onEnter={this.handleEnter}
                onExit={this.handleExit}
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
                                <div className={"modal-dialog " + (this.props.dialogClassName || '')}
                                     style={dialogStyle} onClick={this.handleInnerClick}>
                                    <div className="modal-content">
                                        {header}
                                        {
                                            body &&
                                            <div className="modal-body" style={bodyStyle}>
                                                {body}
                                            </div>
                                        }
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
    fixedScroll: false,
    onCloseClick: () => {},
    onEnter: () => {},
    onExit: () => {},
    show: false
};

Modal.propTypes = {
    className: PropTypes.string,
    closeOnBackdropClick: PropTypes.bool,
    dialogClassName: PropTypes.string,
    fixedScroll: PropTypes.bool,
    onCloseClick: PropTypes.func,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    show: PropTypes.bool
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;