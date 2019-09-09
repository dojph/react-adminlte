import React from 'react'
import Form, {
    CheckBox
} from 'doj-react-adminlte/Form';

export default class DisableCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disableCB: false,
            disabled: false

        };
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    handleToggleClick = () => {
        this.setState({disabled: !this.state.disabled});
    };

    render() {
        const {disableCB, disabled} = this.state;
        const isDisable = this.state.disabled ? "Disabled" : "Enabled" ;
        const btnlbl = this.state.disabled ? "Enable" : "Disable" ;
        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-12">
                        <CheckBox label={isDisable}
                                  name="disableCB"
                                  checked={disableCB}
                                  disabled={disabled}
                        />
                        <button className="btn btn-primary"
                                onClick={this.handleToggleClick} >
                            Click to {btnlbl} CheckBox
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
}