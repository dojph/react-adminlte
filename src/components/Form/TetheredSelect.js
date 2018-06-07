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
                                modifiers={{
                                    preventOverflow: { enabled: true, boundariesElement: 'viewport' },
                                    computeStyle: { enabled: true, gpuAcceleration: false }
                                }}
                                positionFixed>
                            {
                                ({ ref, style, placement}) =>
                                    <div ref={ref}
                                         style={{
                                             ...style,
                                             zIndex: 2500,
                                             width: this._getSelectWidth(),
                                             left: this._getSelectXPos()
                                         }} data-placement={placement}>
                                        {
                                            React.cloneElement(menu, { style: { borderRadius: 0} })
                                        }
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
        return this.wrapper ? this.wrapper.getBoundingClientRect().width : null;
    }

    _getSelectXPos() {
        return this.wrapper ? this.wrapper.getBoundingClientRect().x : null;
    }
}

export default TetheredSelect;
