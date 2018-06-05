import React from 'react';
import ReactDOM from 'react-dom';

import DateTime from 'react-datetime';
import CalendarContainer from 'react-datetime/src/CalendarContainer';
import ResizeAware from 'react-resize-aware';
import {Manager, Reference, Popper} from 'react-popper';

class TetheredDateTime extends DateTime {
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
                onMouseDown: this.openCalendar,
                onFocus: this.openCalendar,
                onChange: this.onInputChange,
                onKeyDown: this.onInputKey,
                value: this.state.inputValue,
                ...this.props.inputProps
            };

            child = <input {...props} style={{...!props.disabled && {backgroundColor: 'white'}}} />;
        } else {
            className += ' rdtStatic';
            child = <div/>;
        }

        return (
            <div className={className}>
                <Manager>
                    <Reference>
                        {({ ref }) => <child.type {...child.props} ref={ref}/>}
                    </Reference>
                    {
                        ReactDOM.createPortal(
                            <Popper placement="bottom-start" positionFixed
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
                                                            onClickOutside={this.handleClickOutside}
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