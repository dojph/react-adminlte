import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import {Manager, Reference, Popper} from 'react-popper';

class TetheredSelect extends Select {
    constructor(props) {
        super(props);
        this.renderOuter = this._renderOuter;
    }

    componentDidMount() {
        super.componentDidMount.call(this);
    }

    _renderOuter() {
        const menu = super.renderOuter.apply(this, arguments);

        // Don't return an updated menu render if we don't have one
        if (!menu) {
            return;
        }

        return (
            <Manager>
                <Reference>
                    {({ref}) => <div ref={ref}/>}
                </Reference>
                {
                    ReactDOM.createPortal(
                        <Popper placement="bottom-start"
                                modifiers={{ preventOverflow: { enabled: true, boundariesElement: 'viewport' } }}>
                            {
                                ({ ref, style, placement}) =>
                                    <div ref={ref} style={style} data-placement={placement}>
                                        {React.cloneElement(menu, {style: {position: 'static', width: this._getSelectWidth()}})}
                                    </div>
                            }
                        </Popper>,
                        document.body
                    )
                }
            </Manager>
        );
    }

    _getSelectWidth() {
        return this.wrapper ? this.wrapper.offsetWidth : null;
    }
}

export default TetheredSelect;
