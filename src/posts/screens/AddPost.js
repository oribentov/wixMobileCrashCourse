import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, TextInput} from 'react-native';
import {Navigation} from 'react-native-navigation';

class AddPost extends Component {
  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  static options = () => {
    return {
      topBar: {
        leftButtons: {
          id: 'dismissBtn',
          text: 'cancel',
          color: 'red',
        },
        rightButtons: {
          id: 'saveBtn',
          text: 'save',
          enabled: false,
        },
      },
    };
  };

  navigationButtonPressed = ({buttonId}) => {
    if (buttonId === 'dismissBtn') {
      Navigation.dismissModal(this.props.componentId);
    } else if (buttonId === 'saveBtn') {
      this.onSavePressed();
    }
  };

  onSavePressed = () => {
    Navigation.dismissModal(this.props.componentId);
    Alert.alert('saveBtn', 'you clicked on the save button', [{text: 'OK'}]);
  };

  onChangeText = text => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: {
          id: 'saveBtn',
          text: 'save',
          enabled: true,
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is AddPost screen</Text>
        <TextInput
          placeholder="write something"
          onChangeText={this.onChangeText}
          textAlign="center"
        />
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
