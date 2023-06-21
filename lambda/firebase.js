const firebaseAdmin = require("firebase-admin");
const serviceAccount = require(`./firebase.json`);

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL:  "https://alexa-3e8c0-default-rtdb.firebaseio.com",
});


module.exports = {
  async getData() {
    try {
      const data = firebaseAdmin.database().ref().child("test").get().val();
      return data ? data : "no data found";
    } catch (error) {
      return `${JSON.stringify(error)}`;
    }
  },
};
