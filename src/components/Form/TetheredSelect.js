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
                    {
                        ({ref}) => {
                            const height = this._getSelectHeight();
                            return <div ref={ref} style={{height: height - 1, marginTop: 1 - height}}/>;
                        }
                    }
                </Reference>
                {
                    ReactDOM.createPortal(
                        <Popper placement="bottom-start"
                                modifiers={{
                                    preventOverflow: { enabled: true, boundariesElement: 'viewport' },
                                    computeStyle: { enabled: true, gpuAcceleration: false }
                                }}>
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
                                            React.cloneElement(menu, {
                                                style: {
                                                    position: 'static',
                                                    borderRadius: 0,
                                                    boxShadow: 'none'
                                                }
                                            })
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

    _getSelectHeight() {
        return this.control ? this.control.getBoundingClientRect().height : null;
    }

    _getSelectWidth() {
        return this.control ? this.control.getBoundingClientRect().width : null;
    }

    _getSelectXPos() {
        return this.control ? this.control.getBoundingClientRect().x : null;
    }
}

export default TetheredSelect;
