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
};
