import React from 'react';
import ReactDOM from 'react-dom';
import Select, {components} from 'react-select';
import {Popper} from "react-popper";
import PropTypes from 'prop-types';
import ResizeAware from 'react-resize-aware';

import helpBlockStyle from "../helpBlockStyle";

const Menu = getInputRef => {
    return props => {
        const inputRef = getInputRef();
        if(!inputRef) return null;

        const width = inputRef.getBoundingClientRect().width;

        return ReactDOM.createPortal(
            <Popper referenceElement={inputRef} placement="bottom-start" positionFixed
                    modifiers={[{
                        name: "preventOverflow",
                        enabled: true,
                        options: {
                            boundariesElement: 'viewport'
                        }
                    }, {
                        name: 'computeStyles',
                        enabled: true,
                        phase: 'beforeWrite',
                        options: {
                            gpuAcceleration: false
                        }
                    }]}>
                {({ref, style, placement, scheduleUpdate}) => (
                    <div ref={ref} style={{...style, width, zIndex: 9999}} data-placement={placement}>
                        <ResizeAware onResize={scheduleUpdate}>
                            <components.Menu {...props}>{props.children}</components.Menu>
                        </ResizeAware>
                    </div>
                )}
            </Popper>,
            document.body
        );
    };
};

const SelectContainer = refCallback => {
    return ({children, ...props}) => {
        return (
            <div ref={refCallback}>
                <components.SelectContainer {...props}>
                    {children}
                </components.SelectContainer>
            </div>
        );
    };
};

class SelectInput extends React.Component {
    constructor(props) {
        super(props);

        this.menuComponent = Menu(this.getInputRef);
        this.selectContainerComponent = SelectContainer(this.setInputRef);
        this.inputRef = null;
    }

    setInputRef = element => {
        this.inputRef = element;
    };

    getInputRef = () => {
        return this.inputRef;
    };

    handleSelectOption = option => {
        const {onChange, name, simpleValue, getOptionValue} = this.props;
        onChange(name, simpleValue ? (option && (getOptionValue ? getOptionValue(option) : option.value)) : option);
    };

    resolveValueFromOptions = value => {
        const {options, simpleValue, getOptionValue} = this.props;
        return simpleValue ? options.filter(o => (getOptionValue ? getOptionValue(o) : o.value) === value) : value;
    };

    render() {
        const {value, clearable: isClearable, disabled: isDisabled, placeholder,
            searchable: isSearchable, getOptionLabel, getOptionValue} = this.props;
        const errors = this.props.errors[this.props.name] || [];
        let props = {isClearable, isDisabled, placeholder, isSearchable};

        if(getOptionLabel) {
            props = {...props, getOptionLabel};
        }

        if(getOptionValue) {
            props = {...props, getOptionValue};
        }

        return (
            <div className={"form-group " + (errors.length > 0 ? "has-error " : "") + (this.props.gridClass || "")}>
                {
                    this.props.label &&
                    <label className={this.props.disabled ? "disabled" : null}>
                        {this.props.label}
                    </label>
                }
                <Select {...props} options={this.props.options} onChange={this.handleSelectOption}
                        value={this.resolveValueFromOptions(value)} maxMenuHeight={250}
                        components={{Menu: this.menuComponent, SelectContainer: this.selectContainerComponent}}
                        styles={{
                            menu: base => ({
                                ...base,
                                float: 'left',
                                position: 'static',
                                borderRadius: 0
                            }),
                            clearIndicator: base => ({...base, padding: '6px', cursor: 'pointer'}),
                            dropdownIndicator: base => ({...base, padding: '6px', cursor: 'pointer'}),
                            control: (base, state) => ({
                                ...base,
                                minHeight: '34px',
                                borderRadius: 0,
                                boxShadow: 'none',
                                ...(errors.length > 0) && {
                                    borderColor: '#dd4b39',
                                    "&:hover": {
                                        borderColor: '#dd4b39'
                                    }
                                },
                                ...state.isFocused && {
                                    borderColor: '#3c8dbc',
                                    "&:hover": {
                                        borderColor: '#3c8dbc'
                                    }
                                }
                            }),
                            option: (base, state) => ({
                                ...base,
                                ...state.isSelected && {
                                    backgroundColor: '#3c8dbc'
                                }
                            })
                        }}/>
                {
                    errors.length > 0 &&
                    <ul className='help-block' style={helpBlockStyle}>
                        {errors.map((e, index) => <li key={index}><span>{e}</span></li>)}
                    </ul>
                }
            </div>
        );
    }
}

SelectInput.defaultProps = {
    clearable: false,
    disabled: false,
    errors: {},
    onChange: () => {},
    options: [],
    placeholder: "Select...",
    searchable: false,
    simpleValue: false,
    value: null,
};

SelectInput.propTypes = {
    /** When set to true, allows clearing of current selection */
    clearable: PropTypes.bool,
    /** Setting to true disables interaction with component */
    disabled: PropTypes.bool,
    /** Accepts an object of errors having the property key as the name of
     *  the component and property value as an array of error messages. See
     *  Forms > Usage page for example. */
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    /** Specifies a Bootstrap 3 grid class */
    gridClass: PropTypes.string,
    /** Specifies the component label */
    label: PropTypes.node,
    /** Specifies the component name. It is used to distinguish elements
     *  for a single form change handler */
    name: PropTypes.string.isRequired,
    /** Callback fired when the component value changes.
     *  Accepts a function with two parameters, the first being the component name prop
     *  and the second being the selected value */
    onChange: PropTypes.func,
    /** Callback used to determine the label to display for each option in the options property */
    getOptionLabel: PropTypes.func,
    /** Callback used to determine the determining value (such as a unique ID) for each option
     *  in the options property
     */
    getOptionValue: PropTypes.func,
    /** Array of objects that populate the select menu */
    options: PropTypes.array,
    /** Placeholder for the select component */
    placeholder: PropTypes.string,
    /** Setting to true enables option search functionality */
    searchable: PropTypes.bool,
    /** Setting to true sets the onChange second parameter to the value returned by getOptionValue
     *  instead of the option object itself
     */
    simpleValue: PropTypes.bool,
    /** The currently selected value. */
    value: PropTypes.any
};

SelectInput.isFormComponent = true;
export default SelectInput;