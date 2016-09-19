module.exports = {
  DATABASE_URI: 'postgres://localhost:5432/ram',
  SESSION_SECRET: 'Optimus Prime is my real dad',
  // TWITTER: {
  //   consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
  //   consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
  //   callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  // },
  // FACEBOOK: {
  //   clientID: 'INSERT_FACEBOOK_CLIENTID_HERE',
  //   clientSecret: 'INSERT_FACEBOOK_CLIENT_SECRET_HERE',
  //   callbackURL: 'INSERT_FACEBOOK_CALLBACK_HERE'
  // },
  GOOGLE: {
    clientID: '589562805527-gkqh35drrq6s9aj4l98u64jrbcf7smfu.apps.googleusercontent.com',
    clientSecret: 'tzCa4tAZilUIwwTVspNxZ6TZ',
    callbackURL: 'http://localhost:1337/auth/google/callback'
  },
  LOGGING: true,
  NATIVE: true
};
