import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class AddPost extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is AddPost screen</Text>
      </View>
    );
  }
}

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
});
