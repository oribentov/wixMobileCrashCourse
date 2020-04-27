import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Button, Image, BorderRadiuses} from 'react-native-ui-lib';
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
    const {title, text, author, img} = this.props.post;

    return (
      <View flex spread padding-25>
        <View>
          <Image source={{uri: img}} style={styles.image} />
          <Text text30 purple10 testID="post-title">
            {title}
          </Text>
          <Text text70 dark10 marginT-12 testID="post-text">
            {text}
          </Text>
          <Text marginT-24 testID="post-author">
            Written by {author}
          </Text>
        </View>
        <Button
          label="Delete Post"
          text80
          red20
          bg-red70
          marginB-10
          onPress={this.onPostDeleteHandler}
          testID="delete-post-btn"
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
  image: {
    width: '100%',
    height: 70,
    marginBottom: 20,
    borderRadius: BorderRadiuses.br20,
  },
});
