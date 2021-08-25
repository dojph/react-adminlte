import React from 'react';
import HoldButton from "./HoldButton";

class PickerControl extends React.Component {
    render() {
        return (
            <>
                <HoldButton className="dralt-cal-control dralt-cal-direction" onClick={this.props.onPreviousClick}>
                    &lsaquo;
                </HoldButton>
                <div className="dralt-cal-control dralt-cal-switch" onClick={this.props.onSwitchClick}>
                    <span>{this.props.switchLabel}</span>
                </div>
                <HoldButton className="dralt-cal-control dralt-cal-direction" onClick={this.props.onNextClick}>
                    &rsaquo;
                </HoldButton>
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