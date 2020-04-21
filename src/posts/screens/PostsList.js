import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
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
    <TouchableOpacity>
      <Text margin-5 onPress={() => this.pushViewPostScreen(item)}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View flex center>
        <Text flex center style={styles.text}>
          This is PostList screen
        </Text>
        <FlatList
          data={this.props.posts}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
        />
      </View>
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
