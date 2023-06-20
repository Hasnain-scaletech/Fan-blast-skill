const firebase = require("firebase-admin");

const config = {
  type: "service_account",
  project_id: "alexa-3e8c0",
  private_key_id: "bfbc76c7cebc7a749ade552e35d5381824a9d09d",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC8EcKTav9LExpQ\nYywzz8ZG/zjEJGKU+0FqTg4gduIuFAahECMPfrI9XEPcw2FYopD5+GrDp6REhSr+\nJpZeD/eYENLLBilVhDQmYxFIiHLKQkRd8BQE1CDTyOczyQ7Vsa+G9XCNles4r2se\nM6BJwsNqwStUrb+GRd9WuQKyR2kkG9taZFLwCxVyAQ17mytG6MCmn1SEljEZAHc4\n4rGTjAL0yE6QF1tFD8sQgSaVlyXpD3Ki61A82p2LgwwNRnXMUA68Ht+u1yuIQq2L\n/XrGUtQtrkIrEWViyWFTJXoFUcnfb0upofIzgIYNVU0dvVzizVkhsLwBWAmOVVHX\n645ifDEhAgMBAAECggEABEmLW/z2cOmwkeCQ42V7KacrzhzeOnM33IqG++p54X8H\nX6iUhAfpXEi8K04w6+pYz7oABRHPRtiaUEzk5KQMiuTnSUWMr6xh2/YqMLMbmszD\n7jhI3ItRbEKKMr4Eno58Z+E0faXLRPGKyZd3sfbEqaxZpoaHdTImkz2IeDP0i6Qk\n0Q8JLegyixMMwKfi3euQ4UIsdtDvkEO7S7WHkFBy3T141JEq9wkGDq+piW7n1iuZ\n2iqrz8XvXFZ6rjRVByziZAAD93uW1DgjWUQ6cIG1m5Qo2m3S/fPTeDHW65rQ0Raj\nOUiK1NpDHtd7RyeVEd7zXdsyG3p1ziA3B2BfVvEPuQKBgQD+RGkPKFVJPB7ZuImj\n3YbnoU9/JiFa0O/WmnqonPvNXkClO8kEi7kBfGp2JLSwChU0M3y3/vbFtXu8lEyJ\n5trTl3O1YgzXgAUwTHPU8e6DPYxhIN21S+kOTEvKcu0WpCK+2LEroyXjwYOHWKnW\nsdSFcbp57z7F7Xu/OawKO/5qewKBgQC9Wdy5KoQHR8YhTnCKL7vXgjfkR0FdyWKb\n6rAgovD+H43Ra0R7BAzrNpQUqmISTWy0BcoZtTHJDZL1kSJ9+QHQaSPNg1s9GpSc\nMY8ucVMpTmp1VHPfa7oKXrN0YRbVhLswpG3XzYK8JwwDAT6qnJPcHd+lVuKN5Qto\n4NXXM8m+EwKBgQCXLqfk6k9jfwq825uDQjlvShuRd2OHswmX6TwbO1QAtRTs6hJI\n0KcM+iP24TZKIYSgCCkU4dVqktDivK6RpCDihH+5DnaiP61WHW8V40+02wi3y6nn\nnR4ScUzzL8hGmQtLvF4DmzrxI+OHuzEoxY2eVpPQ4m7Jkr3sYmcnoqpQNwKBgQCR\nOVKoUYthahLziI2X7nRLHXxwgJYJsGMI4j6jSVU8EkdazsJ+9uRRolKAZw1ArFEq\n4SXYAbhlUxvba6zgoRJbHchv3scjXjeMdBY0sIXvsEzGIDeeq6jMO0W3hJ9Ws649\n6F62nNAgLnJv+4xsnhppQCA/Vxv7aCgQECDyJK4eMQKBgQC+KyBGRb2I1KIdlm3s\n5Sno40DYe3WYkyXwLlneBgxmVzl/ZDancPO1nWHd+2IHtKhGKyWVVG3EhvD9wtW+\n+MZceJSLpHPPrWWZWQo1Hf5Ph8xLNbUJITvIImFGIaUzIFNb+TF0W+zvyOvWqm0R\nFnm8KqGHTJzapm3jt/D9Is0YMQ==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-rtoeb@alexa-3e8c0.iam.gserviceaccount.com",
  client_id: "113770969310326390727",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rtoeb%40alexa-3e8c0.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: "https://alexa-3e8c0-default-rtdb.firebaseio.com/",
});

module.exports = {
  async getData() {
    try {
      const data = firebase.database().ref().child("test").get().val();
      return data ? data : "no data found";
    } catch (error) {
      return "Error occurs in firebaseintant ";
    }
  },
};
