/* eslint-disable no-undef */
const driver = require('./firstTest.driver');
const MockServerApi = require('../src/posts/api.e2e');

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(() => {
    MockServerApi.reset();
  });

  it('should display the posts list on app launch', async () => {
    await expect(driver.get.postsList()).toBeVisible();
  });

  it('should display specific post in post click (first one)', async () => {
    const postId = 1;

    await driver.when.pressOnPost(postId);
    await expect(driver.get.postTitle()).toHaveText('Post 1');
    await expect(driver.get.postText()).toHaveText('post 1 text');
    await expect(driver.get.postAuthor()).toHaveText('Written by Author 1');
  });

  it('should add a new post', async () => {
    const postTitle = 'Test title';

    await driver.when.pressOnAddPostBtn();
    await driver.when.typeTitle(postTitle);
    await driver.when.pressOnSavePost();
    await driver.when.pressOnPost(3);
    await expect(driver.get.postTitle()).toHaveText(postTitle);
  });

  it('should delete a specific post', async () => {
    const postId = 2;

    await driver.when.scrollToBottom();
    await driver.when.pressOnPost(postId);
    await driver.when.pressOnDeletePost();
    //await driver.when.scrollToBottom();

    await expect(driver.get.post(postId)).toBeNotVisible();
  });
});
