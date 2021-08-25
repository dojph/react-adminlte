import React from 'react'
import Form, {
     RadioGroup
} from 'doj-react-adminlte/Form';

export default class InlineRadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: null
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    render() {
        const {color} = this.state;
        const colorOptions = [
            {label: "Yellow", value: "yellow"},
            {label: "Blue", value: "blue"},
            {label: "Black", value: "black"},
            {label: "Green", value: "green"},
            {label: "Red", value: "red"},
            {label: "Other Color", value: "other_color"}
        ];

        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-12">
                        <RadioGroup label="My favorite color"
                                    name="color"
                                    value={color}
                                    options={colorOptions}
                                    inline
                        />
                    </div>
                </div>
            </Form>
        );
    }
}