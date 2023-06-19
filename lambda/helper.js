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
};
