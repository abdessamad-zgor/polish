const { facebookPageApi } = require("../services/endpoints");

let controller = {
  getUserPages: async (req, res) => {
    try {
      let response = await facebookPageApi.getUserPages({
        accessToken: req.body.accessToken,
        userID: req.params.userID,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUserAccessToken: async (req, res) => {
    try {
      let response = await facebookPageApi.getUserAccessToken({
        accessToken: req.body.accessToken,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  page: {
    getAccessToken: async (req, res) => {
      try {
        let response = await facebookPageApi.getPageAccessToken({
          pageID: req.params.pageID,
          accessToken: req.params.accessToken,
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json(error);
      }
    },

    getPageInsights: async (req, res) => {
      try {
        let response = await facebookPageApi.pageInsights({
          pageID: req.params.pageID,
          accessToken: req.params.accessToken,
          period: "day",
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json(error);
      }
    },
    getPageLikes: async (req, res) => {
      try {
        let response = await facebookPageApi.pageLikes({
          pageID: req.params.pageID,
          accessToken: req.params.accessToken,
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    },
    getPageConversations: async (req, res) => {
      try {
        let response = await facebookPageApi.getPageConversations({
          pageID: req.params.pageID,
          accessToken: req.params.accessToken,
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    },
    getPagePosts: async (req, res) => {
      try {
        let response = await facebookPageApi.pagePosts({
          pageID: req.params,
          accessToken: req.params.accessToken,
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json(error);
      }
    },
    getPageInstagramAccounts: async (req, res) => {
      try {
      } catch (error) {}
    },

    post: {
      getPost: async (req, res) => {
        try {
          let response = await facebookPageApi.pagePostById({
            postID: req.params.postID,
            pageID: req.params.pageID,
            accessToken: req.params.accessToken,
          });
          res.status(200).json(response);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      getPostInsights: async (req, res) => {
        try {
          let response = await facebookPageApi.postInsights({
            pageID: req.params.pageID,
            postID: req.params.postID,
            accessToken: req.params.accessToken,
            period: "day",
          });
          res.status(200).json(response);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      getPostLikes: async (req, res) => {
        try {
          let response = await facebookPageApi.pagePostByIdLikes({
            pageID: req.params.pageID,
            postID: req.params.postID,
            accessToken: req.params.accessToken,
          });
          res.status(200).json(response);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      getPostComments: async (req, res) => {
        try {
          let response = await facebookPageApi.pagePostByIdComments({
            pageID: req.params.pageID,
            postID: req.params.postID,
            accessToken: req.params.accessToken,
          });
          res.status(200).json(response);
        } catch (error) {
          res.status(500).json(error);
        }
      },
      getPostReactions: async (req, res) => {
        try {
          let response = await facebookPageApi.pagePostByIdReactions({
            pageID: req.params.pageID,
            postID: req.params.postID,
            accessToken: req.params.accessToken,
          });
          res.status(200).json(response);
        } catch (error) {
          res.status(500).json(error);
        }
      },
    },
  },
};

module.exports = controller;
