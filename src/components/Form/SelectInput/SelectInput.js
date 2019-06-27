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
                    modifiers={{
                        preventOverflow: {enabled: true, boundariesElement: 'viewport'},
                        computeStyle: {enabled: true, gpuAcceleration: false}
                    }}>
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
        const {onChange, name, simpleValue} = this.props;
        onChange(name, simpleValue ? (option && option.value) : option);
    };

    resolveValueFromOptions = value => {
        const {options, simpleValue} = this.props;
        return simpleValue ? options.filter(o => o.value === value) : value;
    };

    handleClear = () => {
        this.props.onChange(this.props.name, null);
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
    clearable: PropTypes.bool,
    disabled: PropTypes.bool,
    errors: PropTypes.objectOf(
        PropTypes.arrayOf(PropTypes.string)
    ),
    gridClass: PropTypes.string,
    label: PropTypes.node,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    getOptionLabel: PropTypes.func,
    getOptionValue: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    searchable: PropTypes.bool,
    simpleValue: PropTypes.bool,
    value: PropTypes.any
};

export default SelectInput;