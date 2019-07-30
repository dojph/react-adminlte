import React from 'react';
import Form, {SelectInput, TextArea, TextInput} from "doj-react-adminlte/Form";

export default class SelectInput4 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            form: null,
            username: '',
            password: '',
            email: '',
            textArea: ''
        }
    }

    handleOnChange = (name, value) => {
        this.setState({[name]: value});
    };

    renderFirstForm = () => {
        return (
            <Form onChange={this.handleOnChange}>
                <div className="row">
                        <div className="col-xs-12">
                            <TextInput name="username" label="Username" value={this.state.username}/>
                        </div>
                        <div className="col-xs-12">
                            <TextInput name="password" label="Password" value={this.state.password}/>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <button className="btn btn-primary pull-right">
                            Submit
                        </button>
                    </div>
            </Form>
        );
    };

    renderSecondForm = () => {
        return (
            <Form onChange={this.handleOnChange}>
                <div className="row">
                        <div className="col-xs-12">
                            <TextInput name="email" label="Email Address" value={this.state.email}/>
                        </div>
                        <div className="col-xs-12">
                            <TextInput name="password" label="Password" value={this.state.password}/>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <button className="btn btn-primary pull-right">
                            Submit
                        </button>
                </div>
            </Form>
        )
    };

    renderThirdForm = () => {
            return (
                <Form onChange={this.handleOnChange}>
                    <div className="row">
                            <div className="col-xs-12">
                                <TextInput name="username" label="Username" value={this.state.username}/>
                            </div>
                            <div className="col-xs-12">
                                <TextArea name="textArea" label="Comments" value={this.state.textArea}/>
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <button className="btn btn-primary pull-right">
                                Submit
                            </button>
                        </div>
                </Form>
            )
    };

    render() {
        let form = null;
        switch (this.state.form) {
            case 1:
                form = this.renderFirstForm();
                break;
            case 2:
                form = this.renderSecondForm();
                break;
            case 3:
                form = this.renderThirdForm();
                break;
        }
        const formTypes = [
            {label: "Form 1", value: 1},
            {label: "Form 2", value: 2},
            {label: "Form 3", value: 3}
        ];

        return (
            <div className="row">
                <div className="col-xs-12">
                    <SelectInput name="form"
                                 label="Form Type"
                                 options={formTypes}
                                 onChange={this.handleOnChange}
                                 value={this.state.form}
                                 simpleValue
                                 clearable/>
                </div>
                <div className="col-xs-12">
                    {form}
                </div>
            </div>
        );
    }
}