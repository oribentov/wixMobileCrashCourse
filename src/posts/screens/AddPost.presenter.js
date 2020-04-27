import {Navigation} from 'react-native-navigation';
import * as postsActions from '../posts.actions';

export function onChangeTitle({title, componentId}) {
  Navigation.mergeOptions(componentId, {
    topBar: {
      rightButtons: [
        {
          id: 'saveBtn',
          text: 'save',
          enabled: !!title,
          testID: 'save-post-btn',
        },
      ],
    },
  });
}

export function onSavePressed({
  componentId,
  title,
  text,
  author,
  postToUpdate,
}) {
  Navigation.dismissModal(componentId);

  if (postToUpdate) {
    const post = {...postToUpdate, title, text, author};
    postsActions.editPost(post);
  } else {
    const randomImageNumber = Math.floor(Math.random() * 500 + 1);

    postsActions.addPost({
      title: title,
      text: text,
      author: author,
      img: `https://picsum.photos/200/200/?image=${randomImageNumber}`,
    });
  }
}
