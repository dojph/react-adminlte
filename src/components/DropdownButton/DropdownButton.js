import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Manager, Reference, Popper} from 'react-popper';

import MenuItem from './MenuItem';
import Divider from './Divider';

class DropdownButton extends React.Component {
    constructor(props) {
        super(props);

        this.buttonRef = null;
        this.menuRef = null;
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setButtonRef = element => {
        this.buttonRef = element;
    };

    setMenuRef = element => {
        this.menuRef = element;
    };

    closeMenu = () => {
        this.setState({show: false});
    };

    handleClickOutside = event => {
        if(this.state.show && !this.buttonRef.contains(event.target) && !this.menuRef.contains(event.target)) {
            this.closeMenu();
        }
    };

    handleButtonClick = () => {
        this.setState({show: !this.state.show});
    };

    render() {
        // Find menu items
        const children = React.Children.toArray(this.props.children);
        const menuItems = children.filter(child => child.type === MenuItem || child.type === Divider)
            .map(item => item.type === MenuItem ?
                React.cloneElement(item, {
                    closeMenuCallback: this.closeMenu
                }) :
                item
            );

        return (
            <Manager>
                <Reference>
                    {
                        ({ref}) => {
                            return (
                                <div ref={this.setButtonRef}>
                                    <button ref={ref} type="button" className={this.props.className}
                                            onClick={this.handleButtonClick}>
                                            {this.props.label} <i className="caret"/>
                                    </button>
                                </div>
                            )
                        }
                    }
                </Reference>
                {
                    this.state.show &&
                    ReactDOM.createPortal(
                        <Popper placement={this.props.menuAlignment === 'left' ? 'bottom-start' : 'bottom-end'}>
                            {
                                ({ref, style, placement}) =>
                                    <div ref={this.setMenuRef}>
                                        <ul className="dropdown-menu"
                                            ref={ref} style={{...style, display: 'block'}} data-placement={placement}>
                                            {
                                                menuItems
                                            }
                                        </ul>
                                    </div>
                            }
                        </Popper>,
                        document.body
                    )
                }
            </Manager>
        );
    }
}

DropdownButton.defaultProps = {
    menuAlignment: 'left'
};

DropdownButton.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    menuAlignment: PropTypes.oneOf([
        'left', 'right'
    ])
};

DropdownButton.MenuItem = MenuItem;
DropdownButton.Divider = Divider;

export default DropdownButton;