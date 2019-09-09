import React from 'react'
import Form, {
    CheckBox
} from 'doj-react-adminlte/Form';

export default class SimpleCheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            samsungCB: false,
            xiaomiCB: false,
            appleCB: false,
            huaweiCB: false
        };
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        const {samsungCB, xiaomiCB, appleCB, huaweiCB} = this.state;
        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-12">
                        <span className="text-bold">Mobile Phone Brands</span>
                        <CheckBox label="Samsung"
                                  name="samsungCB"
                                  checked={samsungCB}/>
                        <CheckBox label="Xiaomi"
                                  name="xiaomiCB"
                                  checked={xiaomiCB}/>
                        <CheckBox label="Apple"
                                  name="appleCB"
                                  checked={appleCB}/>
                        <CheckBox label="Huawei"
                                  name="huaweiCB"
                                  checked={huaweiCB}/>
                    </div>
                </div>
            </Form>
        );
    }
}