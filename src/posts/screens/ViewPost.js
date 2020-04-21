import React, {Component} from 'react';
import {StyleSheet, Button} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import {deletePost} from '../posts.actions/';
import {postsStore} from '../posts.store';
import * as postsNavigation from '../posts.navigation';
import {connect} from 'remx';

class ViewPost extends Component {
  static propTypes = {
    componentId: PropTypes.string,
    post: PropTypes.object,
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  static options(props) {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'editPost',
            text: 'Edit',
          },
        ],
      },
    };
  }

  navigationButtonPressed = ({buttonId}) => {
    if (buttonId === 'editPost') {
      this.onEditPostHandler();
    }
  };

  onEditPostHandler = () => {
    postsNavigation.showAddPostModal(this.props.post);
  };

  onPostDeleteHandler = async () => {
    Navigation.pop(this.props.componentId);
    await deletePost(this.props.post.id);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>This is ViewPost screen</Text>
        <Text style={styles.text}>{this.props.post.title}</Text>
        <Button
          title="Delete Post"
          color="red"
          onPress={this.onPostDeleteHandler}
        />
      </View>
    );
  }
}

function mapStateToProps(props) {
  return {
    post: postsStore.getPost(props.postId),
  };
}

export default connect(mapStateToProps)(ViewPost);

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
