import React from 'react'
import Form, {
    RadioGroup
} from 'doj-react-adminlte/Form';

export default class SimpleValueProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            food1: null,
            food2: null
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    render() {
        const {food1, food2} = this.state;
        const foodOptions = [
            {label: "Spaghetti", value: "spaghetti"},
            {label: "Fried Chicken", value: "fried_chicken"},
            {label: "Burger Steak", value: "burger_steak"},
            {label: "Hamburger", value: "hamburger"}
        ];

        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-6">
                        <RadioGroup label="My favorite food"
                                    name="food1"
                                    value={food1}
                                    options={foodOptions}
                                    simpleValue
                        />
                    </div>
                    <div className="col-xs-6">
                        <RadioGroup label="My favorite food"
                                    name="food2"
                                    value={food2}
                                    options={foodOptions}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <strong>Value:</strong>
                        <pre>
                            {food1 || "null"}
                        </pre>
                    </div>
                    <div className="col-xs-6">
                        <strong>Value:</strong>
                        <pre>
                           {JSON.stringify(food2, null, 2)}
                        </pre>
                    </div>
                </div>
            </Form>
        );
    }
}