// REF: https://medium.com/scripbox-engineering/how-to-hide-a-view-component-in-react-native-8a4994382c0

import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

const MyView = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      { children }
    </View>
  );
};

MyView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ])),
  ]).isRequired,
//   style: ViewPropTypes.style,
  // style: PropTypes.style,
  hide: PropTypes.bool,
};

export default MyView;