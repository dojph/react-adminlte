import React from 'react'
import Form, {
    CheckBox
} from 'doj-react-adminlte/Form';

export default class CheckedByExternal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickmeCB: false
        };
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    handleToggleClick = () =>{
        this.setState({clickmeCB: !this.state.clickmeCB});
    };


    render() {
        const {clickmeCB} = this.state;
        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-3">
                        <CheckBox label="Click me"
                                  name="clickmeCB"
                                  checked={clickmeCB}/>
                        <button className="btn btn-primary"
                                     onClick={this.handleToggleClick}>
                            <i className="margin-r-5"/>
                            Click to toggle state
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
}