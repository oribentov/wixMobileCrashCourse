describe('posts store', () => {
  let postsStore;

  const mockPosts = [
    {
      id: 1,
      title: 'Post 1',
      text:
        'Scientists have developed catalysts that can convert carbon dioxide – the main cause of global warming – into plastics, fabrics, resins and other products. The discovery, based on the chemistry of artificial photosynthesis, is detailed in the journal Energy & Environmental Science.',
      author: 'Author1',
      img: 'http://picsum.photos/200/200/?image=1',
    },
    {
      title: 'Post 2',
      text: 'Post 2 text',
      author: 'Author 2',
      img: 'https://picsum.photos/200/200/?image=187',
      id: 2,
    },
    {
      title: 'Post num 3',
      text:
        'Import the ui-lib\'s TextField component. Use it to get a "floating" placeholder text for the title and to open a modal which will be used to write in the actual text of the blog post.',
      author: 'Ori',
      img: 'https://picsum.photos/200/200/?image=244',
      id: 3,
    },
  ];

  const mockSinglePost = {
    title: 'Post 4',
    text: 'Post 4 text',
    author: 'Author 4',
    img: 'https://picsum.photos/200/200/?image=164',
    id: 4,
  };

  beforeEach(() => {
    postsStore = require('./posts.store').postsStore;
  });

  it('should have an initial state without any posts', () => {
    expect(postsStore.getPosts()).toEqual([]);
  });

  it('should set posts', () => {
    postsStore.setPosts(mockPosts);
    expect(postsStore.getPosts()).toEqual(mockPosts);
  });

  it('should get a post', () => {
    postsStore.setPosts(mockPosts);
    expect(postsStore.getPost(1)).toEqual(mockPosts[0]);
  });

  it('should add a post', () => {
    postsStore.setPosts(mockPosts);
    postsStore.addPost(mockSinglePost);
    expect(postsStore.getPosts()).toEqual([...mockPosts, mockSinglePost]);
  });

  it('should delete a post', () => {
    postsStore.setPosts(mockPosts);
    postsStore.addPost(mockSinglePost);
    expect(postsStore.getPosts()).toEqual([...mockPosts, mockSinglePost]);

    postsStore.deletePost(4);
    expect(postsStore.getPosts()).toEqual(mockPosts);
  });
});
