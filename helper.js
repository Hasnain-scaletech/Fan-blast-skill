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
    try{
        const keys = Object.keys(obj);
    let response = "";

      for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const count = obj[key].count;
    const name = constants.KPIINSIGHTS[key];
    if (key === "euro"&& count !== 0) {
      response += `${name} ${count} ${key}`;

      response +=
        i === keys.length - 2
          ? `<break time="100ms"/>  and `
          : `<break time="100ms"/> `;
    } else if (count !== 0) {
      response += `${count} ${name}`;

      response +=
        i === keys.length - 2
          ? `<break time="100ms"/>  and `
          : `<break time="100ms"/> `;
    }
  }
    return response;
    }catch(error){
        return 'error'
    }
  },

 async messageRes(obj) {
    const keys = Object.keys(obj);
    let temp = 5;
    let response = "";

    for (let i = 0; i < temp; i++) {
      console.log(i, obj[keys[i]].message);
      if (obj[keys[i]].message && obj[keys[i]].message !== "") {
        response += `${obj[keys[i]].name} said  <break time="100ms"/>
        <lang xml:lang="de-DE">
        ${obj[keys[i]].message}
        </lang>
        <break time="200ms"/> `;
      } else {
        temp = temp + 1;
      }
    }
    return response;
  },
};
