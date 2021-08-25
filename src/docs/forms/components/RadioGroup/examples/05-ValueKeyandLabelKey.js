import React from 'react'
import Form, {
    RadioGroup
} from 'doj-react-adminlte/Form';

export default class InlineRadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drink: null
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    render() {
        const {drink} = this.state;
        const drinkOptions = [
            {name: "Coffee", id: 11},
            {name: "Milk", id: 12},
            {name: "Tea", id: 13},
            {name: "Coke", id: 14},
            {name: "Wine", id: 15},
            {name: "Water", id: 16}
        ];
        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-10">
                        <RadioGroup label="My preferred drink"
                                    name="drink"
                                    labelKey="name"
                                    valueKey="id"
                                    value={drink}
                                    options={drinkOptions}
                                    inline
                        />
                    </div>
                </div>
            </Form>
        );
    }
}