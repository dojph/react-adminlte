import React from 'react'
import Form, {
    RadioGroup
} from 'doj-react-adminlte/Form';

export default class FirstDefaultProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bank: null
        };
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    render() {
        const {bank} = this.state;
        const bankOptions = [
            {label: "BDO", value: "bdo"},
            {label: "Security Bank", value: "security_bank"},
            {label: "BPI", value: "bpi"},
            {label: "Landbank", value: "landbank"}
        ];

        return (
            <Form onChange={this.handleChange}>
                <div className="row">
                    <div className="col-xs-6">
                        <RadioGroup label="My preferred bank"
                                    name="bank"
                                    value={bank}
                                    options={bankOptions}
                                    firstDefault
                        />
                    </div>
                </div>
            </Form>
        );
    }
}