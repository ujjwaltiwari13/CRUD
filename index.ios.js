
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RestAPI from './app/crudapp';

export default class CRUD extends Component {
  render() {
    return (
      <View style={styles.container}>
           <RestAPI />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('CRUD', () => CRUD);
