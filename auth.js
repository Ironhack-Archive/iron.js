const axios = require('axios');

require('dotenv').config();

const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env;

const combo = `${TWITTER_CONSUMER_KEY}:${TWITTER_CONSUMER_SECRET}`;
var buffCreds = Buffer.from(combo);
const creds = buffCreds.toString('base64');


axios.post(
  'https://api.twitter.com/oauth2/token',
  'grant_type=client_credentials', {
    headers: {
      'Authorization': `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  })
  .then(res => console.log(res.data));
