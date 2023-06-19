const axios = require("axios");

module.exports = {
  async fanCounts(name) {
    return await axios.get(
      `https://api.fanblast.com/api/v1/creators/${name.toLowerCase()}/fan-counts`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  async creatorDetails(username) {
    return await axios.get(
      `https://api.fanblast.com/api/v1/creators/${username.toLowerCase()}/detail`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
