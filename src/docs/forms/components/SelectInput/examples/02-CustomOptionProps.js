import React from 'react';
import {SelectInput} from "doj-react-adminlte/Form";

class CustomOptionProps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            city: null
        };

        // For example, you have an array of options that
        // have `name' and `id' properties:
        this.options = [
            { id: "1234", name: "Manila" },
            { id: "1235", name: "Makati" },
            { id: "1236", name: "Las Piñas City" },
            { id: "1237", name: "Marikina" },
            { id: "1238", name: "Muntinlupa" },
            { id: "1239", name: "Quezon City" },
        ];
    }

    handleChange = (field, value) => {
        this.setState({[field]: value});
    };

    // getOptionLabel callback. Return option.name
    getLabelByName = option => option.name;

    // getOptionValue callback. Must return a unique value for each
    // option in the options array. Return option.id.
    getValueById = option => option.id;

    render() {
        const {city} = this.state;

        return (
            <SelectInput name='city' label="City"
                         onChange={this.handleChange}
                         getOptionLabel={this.getLabelByName}
                         getOptionValue={this.getValueById}
                         value={city} options={this.options}/>
        );
    }
}

export default CustomOptionProps;