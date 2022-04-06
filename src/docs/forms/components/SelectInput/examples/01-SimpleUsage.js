import React from 'react';
import {SelectInput} from "doj-react-adminlte/Form";

class SimpleUsage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: null
        };

        // By default, SelectInput accepts an array of options
        // having label and value properties. Note that the value
        // property must be unique.
        this.options = [
            { label: "Manila", value: "Manila" },
            { label: "Makati", value: "Makati" },
            { label: "Las Piñas City", value: "Las Piñas City" },
            { label: "Marikina", value: "Marikina" },
            { label: "Muntinlupa", value: "Muntinlupa" },
            { label: "Quezon City", value: "Quezon City" },
        ];
    }

    handleChange = (field, value) => {
        this.setState({[field]: value});
    };

    render() {
        const {city} = this.state;

        return (
            <SelectInput name='city' label="City"
                         onChange={this.handleChange}
                         value={city} options={this.options}/>
        );
    }
}

export default SimpleUsage;