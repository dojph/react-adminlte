import React from 'react'
import Form, {
    CheckBox
} from 'doj-react-adminlte/Form';

export default class InlineCheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appleCB: false,
            orangeCB: false,
            mangoCB: false,
            grapesCB: false,
            pineappleCB: false
        };
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    render() {
        const {appleCB, orangeCB, mangoCB, grapesCB, pineappleCB} = this.state;
        return (
                <Form onChange={this.handleChange}>
                    <div className="row">
                        <div className="col-xs-6">
                            <span className="text-bold">Fruit</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <CheckBox label="Apple"
                                      name="appleCB"
                                      checked={appleCB}
                                      inline={true}
                            />
                            <CheckBox label="Orange"
                                      name="orangeCB"
                                      checked={orangeCB}
                                      inline={true}
                            />
                            <CheckBox label="Mango"
                                      name="mangoCB"
                                      checked={mangoCB}
                                      inline={true}
                            />
                            <CheckBox label="Grapes"
                                      name="grapesCB"
                                      checked={grapesCB}
                                      inline={true}
                            />
                            <CheckBox label="Pineapple"
                                      name="pineappleCB"
                                      checked={pineappleCB}
                                      inline={true}
                            />
                        </div>
                    </div>
                </Form>
        );
    }
}