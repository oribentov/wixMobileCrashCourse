/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList} from 'react-native';
import {
  Text,
  Colors,
  BorderRadiuses,
  Image,
  ListItem,
} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import {postsStore} from '../posts.store';
import * as postsActions from '../posts.actions';
import {connect} from 'remx';
import * as postsNavigation from '../posts.navigation';

class PostList extends Component {
  static propTypes = {
    componentId: PropTypes.string,
    posts: PropTypes.array,
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    postsActions.fetchPosts();
  }

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'addPost',
            text: 'Add',
            testID: 'add-post-btn',
          },
        ],
      },
    };
  }

  navigationButtonPressed = ({buttonId}) => {
    if (buttonId === 'addPost') {
      postsNavigation.showAddPostModal();
    }
  };

  pushViewPostScreen = post => {
    postsNavigation.pushViewPostScreen({
      componentId: this.props.componentId,
      postId: post.id,
      postTitle: post.title,
    });
  };

  renderItem = ({item}) => (
    <ListItem
      activeBackgroundColor={Colors.purple70}
      activeOpacity={0.1}
      height={77.5}
      onPress={() => this.pushViewPostScreen(item)}
      testID={`postItem-${item.id}`}>
      <ListItem.Part left>
        <Image source={{uri: item.img}} style={styles.image} />
      </ListItem.Part>
      <ListItem.Part
        middle
        column
        containerStyle={[styles.border, {paddingRight: 17}]}>
        <ListItem.Part containerStyle={{marginBottom: 3}}>
          <Text
            dark10
            text70
            style={{flex: 1, marginRight: 10}}
            numberOfLines={1}>
            {item.title}
          </Text>
        </ListItem.Part>
        <ListItem.Part>
          <Text
            style={{flex: 1, marginRight: 10}}
            text80
            dark30
            numberOfLines={2}>
            {item.text}
          </Text>
        </ListItem.Part>
      </ListItem.Part>
    </ListItem>
  );

  render() {
    return (
      <FlatList
        testID="posts-list"
        data={this.props.posts}
        keyExtractor={item => `{key-${item.id}`}
        renderItem={this.renderItem}
      />
    );
  }
}

function mapStateToProps() {
  return {
    posts: postsStore.getPosts(),
  };
}

export default connect(mapStateToProps)(PostList);

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.dark60,
  },
});
