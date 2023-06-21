const axios = require("axios");
const { TOKEN, TIMEFRAME } = require("./constant");

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

  async homeScreenKpi() {
    return await axios
      .post(
        `https://dev.fanblast.com/backend/api/v1/kpi/home-screen-kpi-v2`,
        { timeframe: "24h" },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: TOKEN,
          },
        }
      )
      .then((res) => res.data.data.pageVisitors.count);
  },
};
