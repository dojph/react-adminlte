import React from 'react'
import Form, {
     RadioGroup
} from 'doj-react-adminlte/Form';


export default class DisabledProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioGroupDisabled: false,
            radioGroupOption: false
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    handleOnClick = () => {
        this.setState({
            radioGroupDisabled: !this.state.radioGroupDisabled
        });
    };

    render() {
        const {radioGroupDisabled, radioGroupOption} = this.state;
        const switchOptions = [
            {label: "On", value: false},
            {label: "Off", value: true}
        ];
        const radiogrouplbl = this.state.radioGroupDisabled ? "enable" : "disable" ;

        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-3">
                        <RadioGroup label="Switch"
                                    name="radioGroupOption"
                                    value={radioGroupOption}
                                    options={switchOptions}
                                    disabled={radioGroupDisabled}
                                    simpleValue
                        />
                        <button className="btn btn-primary"
                                onClick={this.handleOnClick}>
                            Click to {radiogrouplbl}
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
}