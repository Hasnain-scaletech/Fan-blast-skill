const axios = require("axios");
const { TOKEN } = require("./constant");

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

  async creatorLeaderboard(username) {
    return await axios.get(
      `https://dev.fanblast.com/backend/api/v1/leader-board/${username.toLowerCase()}/creator?ts=a`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: TOKEN,
        },
      }
    );
  },
};
