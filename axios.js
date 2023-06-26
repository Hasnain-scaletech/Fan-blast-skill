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
      `https://api.fanblast.com/api/v1/leader-board/${username.toLowerCase()}/creator`,
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
        `https://api.fanblast.com/api/v1/kpi/home-screen-kpi-v2`,
        { timeframe: "24h" },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: TOKEN,
          },
        }
      )
      .then((res) => res.data.data);
  },

  async getMessages(username) {
    return await axios
      .get(
        `https://5fb1-2401-4900-1c80-bc6f-e4a8-e36d-981e-ee05.ngrok-free.app/${username.toLowerCase()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
  },
};
