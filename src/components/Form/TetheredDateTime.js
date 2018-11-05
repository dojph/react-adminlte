import React from 'react';
import ReactDOM from 'react-dom';

import * as DateTime from 'react-datetime';
import CalendarContainer from 'react-datetime/src/CalendarContainer';
import ResizeAware from 'react-resize-aware';
import {Manager, Reference, Popper} from 'react-popper';

class TetheredDateTime extends DateTime {
    constructor(props) {
        super(props);

        this.rootNode = null;
        this.calNode = null;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleT);
    }

    componentWillUnmount() {
        document.addEventListener('mousedown', this.handleT);
    }

    handleT = event => {
        if(this.rootNode && !this.rootNode.contains(event.target) &&
            this.calNode && !this.calNode.contains(event.target)) {
            this.handleClickOutside();
        }
    };

    setRootNodeRef = element => {
        this.rootNode = element;
    };

    setCalNodeRef = element => {
        this.calNode = element;
    };

    render() {
        let className = 'rdt' + (this.props.className ?
            ( Array.isArray( this.props.className ) ?
                ' ' + this.props.className.join( ' ' ) : ' ' + this.props.className) : ''),
            child;

        if ( this.props.input ) {
            const props = {
                key: 'i',
                type: 'text',
                className: 'form-control',
                value: this.state.inputValue,
                ...this.props.inputProps,
                onClick: this.overrideEvent('onClick', this.openCalendar),
                onFocus: this.overrideEvent('onFocus', this.openCalendar),
                onChange: this.overrideEvent('onChange', this.onInputChange),
                onKeyDown: this.overrideEvent('onKeyDown', this.onInputKey)
            };

            child = <input {...props} style={{...!props.disabled && {backgroundColor: 'white'}}} />;
        } else {
            className += ' rdtStatic';
            child = <div/>;
        }

        return (
            <div className={className} ref={this.setRootNodeRef}>
                <Manager>
                    <Reference>
                        {({ ref }) => <child.type {...child.props} ref={ref}/>}
                    </Reference>
                    {
                        ReactDOM.createPortal(
                            <Popper placement="bottom-start" positionFixed innerRef={this.setCalNodeRef}
                                    modifiers={{ preventOverflow: { enabled: true, boundariesElement: 'viewport' } }}>
                                {
                                    ({ ref, style, placement, scheduleUpdate }) => {
                                        if(this.state.open) {
                                            return (
                                                <div ref={ref} className='rdtPicker' style={{...style, display: 'block'}}
                                                     data-placement={placement}>
                                                    <ResizeAware onResize={scheduleUpdate}>
                                                        <CalendarContainer
                                                            view={this.state.currentView}
                                                            viewProps={this.getComponentProps()}
                                                        />
                                                    </ResizeAware>
                                                </div>
                                            );
                                        }

                                        return null;
                                    }
                                }
                            </Popper>,
                            document.body
                        )
                    }
                </Manager>
            </div>
        );
    }
}

export default TetheredDateTime;