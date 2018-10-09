
import { Dimensions, StyleSheet, View } from 'react-native'

import PropTypes from 'prop-types';
import React from 'react';



const Container = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
);

Container.propTypes = {
  children: PropTypes.any,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d5d9de', //#4F6D7A
      },
});

export default Container;