const express = require("express");

let router = new express.Router();

let facebookController = require("../controllers/facebookApiController");

const routes = {
  facebook: {
    getUserPages: "/facebook/:userID/pages",
    getUserAccessToken: "/facebook/accessToken",
    page: {
      accessToken: "/facebook/:pageID/accessToken",
      insights: "/facebook/:pageID/insights",
      conversations: "/facebook/:pageID/conversations",
      likes: "/facebook/:pageID/likes",
      posts: {
        all: "/facebook/:pageID/posts",
        id: "/facebook/:pageID/posts/:postID",
        insights: "/facebook/:pageID/posts/:postID/insights",
        likes: "/facebook/:pageID/posts/:postID/likes",
        comments: "/facebook/:pageID/posts/:postID/comments",
        reactions: "/facebook/:pageID/posts/:postID/reactions",
      },
    },
  },
  instargram: {},
  analytics: {},
  search: {},
};

//facebook Page API
router.get(
  routes.facebook.getUserAccessToken,
  facebookController.getUserAccessToken
);
router.get(routes.facebook.getUserPages, facebookController.getUserPages);
router.get(
  routes.facebook.page.accessToken,
  facebookController.page.getAccessToken
);
router.get(
  routes.facebook.page.insights,
  facebookController.page.getPageInsights
);
router.get(
  routes.facebook.page.conversations,
  facebookController.page.getPageConversations
);
router.get(routes.facebook.page.likes, facebookController.page.getPageLikes);
router.get(
  routes.facebook.page.posts.all,
  facebookController.page.getPagePosts
);
router.get(routes.facebook.page.posts.id, facebookController.page.post.getPost);
router.get(
  routes.facebook.page.posts.comments,
  facebookController.page.post.getPostComments
);
router.get(
  routes.facebook.page.posts.insights,
  facebookController.page.post.getPostInsights
);
router.get(
  routes.facebook.page.posts.likes,
  facebookController.page.post.getPostLikes
);
router.get(
  routes.facebook.page.posts.reactions,
  facebookController.page.post.getPostReactions
);

//instagram api

module.exports = router;
