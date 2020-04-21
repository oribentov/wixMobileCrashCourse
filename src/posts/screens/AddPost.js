import React, {Component} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import * as postsActions from '../posts.actions';

class AddPost extends Component {
  static propTypes = {
    componentId: PropTypes.string,
    postToUpdate: PropTypes.object,
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

    const {postToUpdate} = this.props;

    this.state = {
      title: postToUpdate && postToUpdate.title,
      text: postToUpdate && postToUpdate.text,
      author: postToUpdate && postToUpdate.author,
    };
  }

  static options = props => {
    return {
      topBar: {
        title: {
          text: props.postToUpdate ? 'Edit Post' : 'Add Post',
        },
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
    const {postToUpdate} = this.props;
    const {title, text, author} = this.state;

    Navigation.dismissModal(this.props.componentId);

    if (postToUpdate) {
      const post = {...postToUpdate, title, text, author};
      postsActions.editPost(post);
    } else {
      const randomImageNumber = Math.floor(Math.random() * 500 + 1);

      postsActions.addPost({
        title: this.state.title,
        text: this.state.text,
        author: this.state.author,
        img: `https://picsum.photos/200/200/?image=${randomImageNumber}`,
      });
    }
  };

  enableSaveButton = () => {
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

  onChangeTitle = title => {
    this.setState({title});
    this.enableSaveButton();
  };

  onChangeText = text => {
    this.setState({text});
    this.enableSaveButton();
  };

  onChangeAuthor = author => {
    this.setState({author});
    this.enableSaveButton();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is AddPost screen</Text>
        <TextInput
          placeholder="Write a post title"
          onChangeText={this.onChangeTitle}
          textAlign="center"
          value={this.state.title}
        />
        <TextInput
          placeholder="Write a post text"
          onChangeText={this.onChangeText}
          textAlign="center"
          value={this.state.text}
        />
        <TextInput
          placeholder="Author name"
          onChangeText={this.onChangeAuthor}
          textAlign="center"
          value={this.state.author}
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
