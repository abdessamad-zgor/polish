let apiCall = require("./apiCall");

let instagramGraphApi = {
  getIGUser: async (params) =>
    apiCall(`https://graph.facebook.com/v13.0/${params.userID}/fields`, "GET"),
  getAccountInsights: async (params) =>
    apiCall(
      `https://graph.facebook.com/${params.IGUserID}/insights?fields=impressions,reach,profile_views&period=${params.period}&access_token=${params.accessToken}`,
      "GET"
    ),
  getMediaInsights: async (params) =>
    apiCall(
      `https://graph.facebook.com/${params.mediaID}/insights?fields=impressions,reach,engagement&period=${params.period}&access_token=${params.accessToken}`,
      "GET"
    ),
  getAccountMedia: "",
  getMentions: async (params) =>
    apiCall(`https://graph.facebook.com/v13.0/${params.IGUserID}/`, "GET"),
  uploadMedia: async (params) =>
    apiCall(
      `https://graph.facebook.com/${params.IGUserID}/media?access_token=${params.accessToken}`,
      "POST",
      params.data
    ),
  publishMedia: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}/fields=instagram_business_account&access_token=${params.accessToken}`,
      "GET"
    ),
};

let facebookPageApi = {
  getUserAccessToken: async (params) =>
    apiCall(
      `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.CLIENT_SECRET}&fb_exchange_token=${params.accessToken}`,
      "GET"
    ),
  getUserPages: async (params) =>
    apiCall(
      `https://graph.facebook.com/${params.userID}/accounts?fields=name,access_token&access_token=${params.accessToken}`,
      "GET"
    ),
  getPageAccessToken: async (params) =>
    apiCall(
      `https://graph.facebook.com/${params.pageID}?fields=access_token&access_token=${params.accessToken}`,
      "GET"
    ),
  getPageConversations: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}/conversations?folder=inbox&access_token=${params.accessToken}`,
      "GET"
    ),
  pagePostById: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}_${params.postID}?access_token=${params.accessToken}`,
      "GET"
    ),
  pagePostByIdLikes: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}_${params.postID}/likes?access_token=${params.accessToken}`,
      "GET"
    ),
  pagePostByIdReactions: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}_${params.postID}/reactions?access_token=${params.accessToken}`,
      "GET"
    ),
  pagePostByIdComments: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}_${params.postID}/comments?access_token=${params.accessToken}`,
      "GET"
    ),
  pagePosts: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}/published_posts?access_token=${params.accessToken}`,
      "GET"
    ),
  pageInsights: async (params) =>
    apiCall(
      `https://graph.facebook.com/${pageID}/insights/page_impressions_unique?access_token=${params.accessToken}&period=${params.period}`,
      "GET"
    ),
  messages: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.IGUserID}/fields`,
      "GET"
    ),
  photos: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.IGUserID}/fields`,
      "GET"
    ),
  videos: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.IGUserID}/fields`,
      "GET"
    ),
  pageLikes: async (params) =>
    apiCall(`https://graph.facebook.com/v13.0/${params.pageID}/likes`, "GET"),
  settings: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.IGUserID}/fields`,
      "GET"
    ),
  getPageInstagramAccount: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}/fields=instagram_business_account&access_token=${params.accessToken}`,
      "GET"
    ),
  postInsights: async (params) =>
    apiCall(
      `https://graph.facebook.com/v13.0/${params.pageID}_${params.postID}/insights`,
      "GET"
    ),
};

let analyticsApi = {};

let searchConsoleApi = {};

module.exports = {
  instagramGraphApi,
  facebookPageApi,
  analyticsApi,
  searchConsoleApi,
};
