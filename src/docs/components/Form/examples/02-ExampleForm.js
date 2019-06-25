import React from 'react';

import Form, {
    CheckBox, RadioGroup, SelectInput, TextInput
} from "doj-react-adminlte/Form";

import Box from 'doj-react-adminlte/Box';

export default class ExampleForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            names: null,
            name: null,
            coffee: null,
            choice1: null,
            choice2: null,
            brand: null
        }
    }
    handleChange = (name, value) => {
        this.setState({[name]: value});
    };
    render(){
        const namesOptions = [
            { label: "John", value: "John" },
            { label: "Doe", value: "Doe" },
            { label: "JL", value: "JL" },
            { label: "Steph", value: "Steph" },
            { label: "Chelz", value: "Chelz" },
            { label: "Jose", value: "Jose" },
            { label: "Mit", value: "Mit" },
            { label: "Wayne", value: "Wayne" },
            { label: "Jessy", value: "Jessy" }
        ];
        const shoesOptions = [
            { label: "Adidas", value: "Adidas" },
            { label: "Nike", value: "Nike" },
            { label: "Under Armour", value: "Under Armour" },
            { label: "New Balance", value: "New Balance" }
        ];

        const errors = {
            comments: ['Empty Field']
        };
        return(
            <div>
                <Box theme="box box-solid box-success"> collapsible={true}>
                    <Box.Header title='Form Elements'/>
                    <Box.Body>
                        <Form onChange={this.handleChange} errors={errors}>
                            <div>
                                <div className='row'>
                                    <div className='col-xs-6'>
                                        <h4><strong>Searchable Select Input</strong></h4>
                                        <SelectInput label="List of Names" name="names" value={this.state.names}
                                                      simpleValue={false} searchable={true}
                                                      options={namesOptions} clearable/>
                                    </div>
                                    <div className='col-xs-6'>
                                        <span><h4><strong>Disabled Text Input</strong></h4></span>
                                        <TextInput name="name" disabled={true} feedbackIconClass='fa fa-user' placeholder='Username' value={this.state.name} label="Username"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6">
                                        <h4><strong>Disabled RadioGroup</strong></h4>
                                        <RadioGroup label="Brands" name="brand" value={this.state.brand}
                                                    options={shoesOptions} simpleValue disabled={true} firstDefault/>
                                    </div>
                                    <div className="col-xs-6">
                                        <h4><strong>CheckBox</strong></h4>
                                        <CheckBox label="Lakers" name="lakers" checked={this.state.choice1}/>
                                        <CheckBox label="Miami Heat" name="miami" checked={this.state.choice2}/>
                                        <CheckBox disabled={true} label="Ginebra" name="ginebra" checked={this.state.choice3}/>
                                        <CheckBox disabled={true} label="Alaska" name="alaska" checked={this.state.choice4}/>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Box.Body>
                </Box>
            </div>
        )


    }

}