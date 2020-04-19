import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';

class ViewPost extends Component {
  onPressDeleteHandler = event => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is ViewPost screen</Text>
        <Button
          title="Delete Post"
          color="red"
          onPress={this.onPressDeleteHandler}
        />
      </View>
    );
  }
}

export default ViewPost;

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
