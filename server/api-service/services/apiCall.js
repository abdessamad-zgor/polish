let axios = require("axios");
let { HttpErrorHandler } = require("../utils/errorHandlers");

let apiCall = async (url, method) => {
  try {
    let response = await axios({ url, method });
    return response.data;
  } catch (e) {
    HttpErrorHandler(e);
  }
};

module.exports = apiCall;
