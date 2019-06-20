import React from 'react';

class PickerControl extends React.Component {
    render() {
        return (
            <>
                <div className="dralt-cal-control dralt-cal-direction" onClick={this.props.onPreviousClick}>
                    <span>&lsaquo;</span>
                </div>
                <div className="dralt-cal-control dralt-cal-switch" onClick={this.props.onSwitchClick}>
                    <span>{this.props.switchLabel}</span>
                </div>
                <div className="dralt-cal-control dralt-cal-direction" onClick={this.props.onNextClick}>
                    <span>&rsaquo;</span>
                </div>
            </>
        );
    }
}

PickerControl.defaultProps = {
    onPreviousClick: () => {},
    onNextClick: () => {},
    onSwitchClick: () => {},
    switchLabel: ""
};

export default PickerControl;