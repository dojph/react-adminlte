import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group';

import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

const ModalBody = ({children}) => children || null;

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            mounted: false,
            exited: true,
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

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        if(!this.state.exited) {
            // Force handleExited
            this.handleExited();
        }
    }

    updateDimensions = () => {
        if(this.props.fixedScroll) {
            let maxWidth = 600;
            if(this.props.size === 'large') {
                maxWidth = 1100;
            } else if(this.props.size === 'small') {
                maxWidth = 300;
            }

            const isSmall = window.innerWidth < 768;

            this.setState({
                fixedBodyHeight: window.innerHeight - (isSmall ? 141 : 182),
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

    handleEscapeKeypress = event => {
        event = event || window.event;
        let isEscape = false;
        if("key" in event) {
            isEscape = (event.key === "Escape" || event.key === "Esc");
        } else {
            isEscape = (event.keyCode === 27);
        }

        if(isEscape) {
            this.props.onCloseClick();
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
        this.setState({exited: false});

        // Add escape key event listener
        const {closeOnEscapeKey} = this.props;
        if(closeOnEscapeKey) {
            window.addEventListener('keyup', this.handleEscapeKeypress);
        }

        this.props.onEnter();
    };

    handleExited = () => {
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = null;
        this.setState({exited: true});

        // Remove escape key event listener
        window.removeEventListener('keyup', this.handleEscapeKeypress);

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

        let dialogClass = "default", dialogStyle = null, bodyStyle = null;

        if(this.props.size === 'large') {
            dialogClass = 'modal-lg';
        } else if(this.props.size === 'small') {
            dialogClass = 'modal-sm';
        }

        if(this.props.fixedScroll) {
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
                                <div className={`modal-dialog ${dialogClass} ` + (this.props.dialogClassName || '')}
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
    closeOnEscapeKey: true,
    fixedScroll: false,
    onCloseClick: () => {},
    onEnter: () => {},
    onExit: () => {},
    show: false,
    size: 'default'
};

Modal.propTypes = {
    className: PropTypes.string,
    closeOnBackdropClick: PropTypes.bool,
    closeOnEscapeKey: PropTypes.bool,
    dialogClassName: PropTypes.string,
    fixedScroll: PropTypes.bool,
    onCloseClick: PropTypes.func,
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    show: PropTypes.bool,
    size: PropTypes.oneOf(['default', 'large', 'small'])
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;