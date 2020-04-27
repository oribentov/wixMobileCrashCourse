describe('AddPost presenter', () => {
  let Presenter, Navigation, postsActions;
  const mockComponentId = 'mock-componentId';
  const mockTitle = 'mock-title';
  const mockText = 'mock-test';
  const mockAuthor = 'mock-author';

  beforeEach(() => {
    jest.mock('react-native-navigation');
    Presenter = require('./AddPost.presenter');
    Navigation = require('react-native-navigation').Navigation;

    jest.mock('../posts.actions');
    postsActions = require('../posts.actions');
  });

  it('should enable the save button if title is not blank', () => {
    Presenter.onChangeTitle({
      componentId: mockComponentId,
      title: mockTitle,
    });

    expect(
      Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled,
    ).toBeTruthy();
  });

  it('should not enable the save button if title is blank', () => {
    Presenter.onChangeTitle({
      componentId: mockComponentId,
      title: '',
    });

    expect(
      Navigation.mergeOptions.mock.calls[0][1].topBar.rightButtons[0].enabled,
    ).not.toBeTruthy();
  });

  it('should dismiss the modal when clicking on save', () => {
    Presenter.onSavePressed({
      componentId: mockComponentId,
      title: mockTitle,
      text: mockText,
      author: mockAuthor,
    });

    expect(Navigation.dismissModal).toHaveBeenCalledWith(mockComponentId);
  });

  it('should call add post action when clicking in save', () => {
    Presenter.onSavePressed({
      componentId: mockComponentId,
      title: mockTitle,
      text: mockText,
      author: mockAuthor,
    });

    expect(postsActions.addPost).toHaveBeenCalledWith({
      title: mockTitle,
      text: mockText,
      author: mockAuthor,
      img: expect.any(String),
    });
  });

  it('should call update post action when clicking on save if given post to update', () => {
    const postToUpdate = {
      id: 1,
      title: 'old-title',
      text: 'old-text',
      author: 'old-author',
      img: 'old-image',
    };

    Presenter.onSavePressed({
      componentId: mockComponentId,
      title: mockTitle,
      text: mockText,
      author: mockAuthor,
      postToUpdate,
    });

    expect(postsActions.editPost).toHaveBeenCalledWith({
      id: 1,
      title: mockTitle,
      text: mockText,
      author: mockAuthor,
      img: 'old-image',
    });
  });

  afterEach(() => {
    jest.resetModules();
  });
});
