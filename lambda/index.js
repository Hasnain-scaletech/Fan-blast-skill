const Alexa = require("ask-sdk-core");
const constants = require("./constant");
const api = require("./axios");
const firebase = require("./firebase");
const helper = require("./helper");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  handle(handlerInput) {
    const speakOutput =
      "Welcome Fan Blast, for fan count you can say fan count or Help. Which would you like to try?";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const FirebaseIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "FirebaseIntent"
    );
  },
  async handle(handlerInput) {
    try {
      const speakOutput = await firebase.getData();

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    } catch (error) {
      const speakOutput = `Sorry, there was an error retrieving data from the firebase.${error}`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
  },
};

const fanCountIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "FanCountIntent"
    );
  },
  async handle(handlerInput) {
    const { responseBuilder, requestEnvelope } = handlerInput;

    const username = Alexa.getSlotValue(requestEnvelope, "username");

    const res = await api.fanCounts(username);

    const speakOutput = res
      ? `${username} has ${res.data.data.totalFanCounts} fans`
      : `sorry ${username} not found`;

    return responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const vcardIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "vcardIntent"
    );
  },
  async handle(handlerInput) {
    const { responseBuilder, requestEnvelope } = handlerInput;

    const username = Alexa.getSlotValue(requestEnvelope, "username");

    const res = await api.creatorDetails(username);

    const vCard = res.data.data.vCard ? res.data.data.vCard.phone : null;

    const speakOutput = `vCard of ${username} is <say-as interpret-as="telephone">${vCard}</say-as>`;

    return responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const leaderboardIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "leaderboardIntent"
    );
  },
  async handle(handlerInput) {
    const { responseBuilder, requestEnvelope } = handlerInput;

    const username = Alexa.getSlotValue(requestEnvelope, "username");

    const res = await api.creatorLeaderboard(username);

    const list = await helper.createArrayReadable(res.data.data.items, 5);

    const speakOutput = `<p><s> Here is ${username}'s top <say-as interpret-as="ordinal">5</say-as> fans </s></p> 
    <p><s> ${list} </s></p> `;

    return responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const msgIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "MsgIntent"
    );
  },
  async handle(handlerInput) {
    const speakOutput = `You have total ${Math.round(
      Math.random(10) * 100
    )} msg in your inbox!`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const NameIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "NameIntent"
    );
  },
  async handle(handlerInput) {
    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const profileName = await helper.nameFinder(serviceClientFactory);
      if (!profileName) {
        const noNameResponse = `It looks like you don't have an name set. You can set your name from the companion app.`;
        return responseBuilder
          .speak(noNameResponse)
          .withSimpleCard(constants.APP_NAME, noNameResponse)
          .getResponse();
      }
      const speechResponse = `Your name is here, ${profileName}`;
      return responseBuilder
        .speak(speechResponse)
        .withSimpleCard(constants.APP_NAME, speechResponse)
        .getResponse();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.statusCode === 403) {
        return responseBuilder
          .speak(constants.MESSAGES.NOTIFY_MISSING_PERMISSIONS)
          .withAskForPermissionsConsentCard([constants.NAME_PERMISSION])
          .getResponse();
      }
      console.log(JSON.stringify(error));
      const response = responseBuilder
        .speak(constants.MESSAGES.ERROR)
        .getResponse();
      return response;
    }
  },
};

const EmailIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "EmailIntent"
    );
  },
  async handle(handlerInput) {
    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const profileEmail = await helper.emailFinder(serviceClientFactory);
      if (!profileEmail) {
        const noEmailResponse = `It looks like you don't have an email set. You can set your email from the companion app.`;
        return responseBuilder
          .speak(noEmailResponse)
          .withSimpleCard(constants.APP_NAME, noEmailResponse)
          .getResponse();
      }
      const speechResponse = `Your email is here, ${profileEmail}`;
      return responseBuilder
        .speak(speechResponse)
        .withSimpleCard(constants.APP_NAME, speechResponse)
        .getResponse();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.statusCode === 403) {
        return responseBuilder
          .speak(constants.MESSAGES.NOTIFY_MISSING_PERMISSIONS)
          .withAskForPermissionsConsentCard([constants.EMAIL_PERMISSION])
          .getResponse();
      }
      console.log(JSON.stringify(error));
      const response = responseBuilder
        .speak(constants.MESSAGES.ERROR)
        .getResponse();
      return response;
    }
  },
};

const MobileIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "MobileIntent"
    );
  },
  async handle(handlerInput) {
    const { serviceClientFactory, responseBuilder } = handlerInput;
    try {
      const profileMobileObject = await helper.mobileFinder(
        serviceClientFactory
      );

      if (!profileMobileObject) {
        const errorResponse = `It looks like you don't have a mobile number set. You can set your mobile number from the companion app.`;
        return responseBuilder
          .speak(errorResponse)
          .withSimpleCard(constants.APP_NAME, errorResponse)
          .getResponse();
      }
      const profileMobile = profileMobileObject.phoneNumber;
      const speechResponse = `Your mobile number is, <say-as interpret-as="telephone">${profileMobile}</say-as>`;
      const cardResponse = `Your mobile number is, ${profileMobile}`;
      return responseBuilder
        .speak(speechResponse)
        .withSimpleCard(constants.APP_NAME, cardResponse)
        .getResponse();
    } catch (error) {
      console.log(JSON.stringify(error));
      if (error.statusCode === 403) {
        return responseBuilder
          .speak(constants.MESSAGES.NOTIFY_MISSING_PERMISSIONS)
          .withAskForPermissionsConsentCard([constants.MOBILE_PERMISSION])
          .getResponse();
      }
      console.log(JSON.stringify(error));
      const response = responseBuilder
        .speak(constants.MESSAGES.ERROR)
        .getResponse();
      return response;
    }
  },
};

const SocialIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "SocialIntent"
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;

    const [username, socialtype] = [
      Alexa.getSlotValue(requestEnvelope, "username"),
      Alexa.getSlotValue(requestEnvelope, "socialtype"),
    ];

    const res = await api.creatorDetails(username);

    const linkData =
      Object.keys(res.data.data).length !== 0
        ? res.data.data.links.find(
            (item) => item.type === constants.SOCIALS[socialtype]
          )
        : null;

    const speakOutput = linkData
      ? `${socialtype} link is ${linkData.url} for ${username}.`
      : `sorry ${socialtype} link for ${username} is not found`;

    return responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const StartUpdatesIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "StartUpdatesIntent"
    );
  },
  async handle(handlerInput) {
    const { requestEnvelope, responseBuilder } = handlerInput;

    const username = Alexa.getSlotValue(requestEnvelope, "username");
    const duration = Alexa.getSlotValue(requestEnvelope, "duration");

    const res = await api.fanCounts(username);

    const speakOutput = res
      ? `${username} has ${res.data.data.totalFanCounts} fans after ${duration}`
      : `sorry ${username} not found`;

    return responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "You can say hello to me!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText = "Goodbye!";

    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(
      `Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`
    );

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, I can't understand the command. Please say again.")
      .reprompt("Sorry, I can't understand the command. Please say again.")
      .getResponse();
  },
};

const RequestLog = {
  process(handlerInput) {
    console.log(
      `REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
  },
};

const ResponseLog = {
  process(handlerInput) {
    console.log(`RESPONSE BUILDER = ${JSON.stringify(handlerInput)}`);
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    SocialIntentHandler,
    StartUpdatesIntentHandler,
    EmailIntentHandler,
    NameIntentHandler,
    MobileIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    fanCountIntentHandler,
    msgIntentHandler,
    vcardIntentHandler,
    leaderboardIntentHandler,
    FirebaseIntentHandler
  )
  .addRequestInterceptors(RequestLog)
  .addResponseInterceptors(ResponseLog)
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
