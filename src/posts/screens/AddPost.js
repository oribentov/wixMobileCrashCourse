import React, {Component} from 'react';
import {View, Text, TextField} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import * as postsActions from '../posts.actions';
import * as Presenter from './AddPost.presenter';

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
          testID: 'save-post-btn',
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
    const {postToUpdate, componentId} = this.props;

    Presenter.onSavePressed({
      componentId: componentId,
      title: this.state.title,
      text: this.state.text,
      author: this.state.author,
      postToUpdate,
    });
  };

  enableSaveButton = () => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: {
          id: 'saveBtn',
          text: 'save',
          enabled: true,
          testID: 'save-post-btn',
        },
      },
    });
  };

  onChangeTitle = title => {
    this.setState({title});
    Presenter.onChangeTitle({componentId: this.props.componentId, title});
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
      <View flex padding-24>
        <Text text40 purple10 marginB-24>
          Add Post
        </Text>
        <TextField
          text70
          floatingPlaceholder
          placeholder="Write a post title"
          onChangeText={this.onChangeTitle}
          value={this.state.title}
          containerStyle={{marginBottom: 12}}
          testID="title-input"
        />
        <TextField
          text70
          floatingPlaceholder
          expandable
          placeholder="Write a post text"
          onChangeText={this.onChangeText}
          textAlign="center"
          value={this.state.text}
        />
        <TextField
          floatingPlaceholder
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
