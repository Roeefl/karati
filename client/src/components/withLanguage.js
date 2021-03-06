import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DEFAULT } from '../locale';

export default (ChildComponent) => {
    class ComposedComponent extends Component {
        render() {
            return <ChildComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        const { language } = state;
        return {
            language,
            direction: (language === DEFAULT ? 'ltr' : 'rtl')
        };
    };

    return connect(mapStateToProps)(ComposedComponent);
};