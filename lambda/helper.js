const constants = require("./constant");

module.exports = {
  async mobileFinder(serviceClientFactory) {
    const upsServiceClient = serviceClientFactory.getUpsServiceClient();
    return await upsServiceClient.getProfileMobileNumber();
  },

  async emailFinder(serviceClientFactory) {
    const upsServiceClient = serviceClientFactory.getUpsServiceClient();
    return await upsServiceClient.getProfileEmail();
  },

  async nameFinder(serviceClientFactory) {
    const upsServiceClient = serviceClientFactory.getUpsServiceClient();
    return await upsServiceClient.getProfileName();
  },

  async createArrayReadable(array, limit) {
    let data = "";
    for (let i = 1; i <= limit; i++) {
      data += `<say-as interpret-as="ordinal">${i}</say-as>, ${
        array[i - 1].name
      } <break time="100ms"/>`;
    }

    return data;
  },

  async KpiRes(obj) {
    const keys = Object.keys(obj);
    let response = `In the last 24 hours <break time="100ms"/>`;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const count = obj[key].count;
      const name = constants[key];

      if (count !== 0) {
        response += `${count} ${name}`;
        response +=
          i === keys.length - 2
            ? `<break time="100ms"/>  and `
            : `<break time="100ms"/> `;
      }
    }
    return response;
  },
};
