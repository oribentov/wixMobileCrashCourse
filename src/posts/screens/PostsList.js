import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

class PostList extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    this.pushViewPostScreen = this.pushViewPostScreen.bind(this);
  }

  static propTypes = {
    componentId: PropTypes.string,
  };

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addPost',
            text: 'Add',
          },
        ],
      },
    };
  }

  navigationButtonPressed = ({buttonId}) => {
    if (buttonId === 'addPost') {
      this.showAddPostModal();
    }
  };

  pushViewPostScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'blog.ViewPost',
        passProps: {
          somePropToPass: 'Some props that we are passing',
        },
        options: {
          topBar: {
            title: {
              text: 'Post1',
            },
          },
        },
      },
    });
  }

  showAddPostModal = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'blog.AddPost',
            },
          },
        ],
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.pushViewPostScreen}>
          <Text style={styles.text}>This is PostList screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PostList;

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
