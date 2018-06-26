const Twitter = require('twitter');
const moment = require('moment');
const NaturalLanguageUnderstandingV1 =
  require('watson-developer-cloud/natural-language-understanding/v1.js');

require('dotenv').config();

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
  TWITTER_BEARER_TOKEN,
  WATSON_URL,
  WATSON_USERNAME,
  WATSON_PASSWORD
} = process.env;

const [,, screen_name] = process.argv;



var client = new Twitter({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  bearer_token: TWITTER_BEARER_TOKEN
});

var nlu = new NaturalLanguageUnderstandingV1({
  url: WATSON_URL,
  username: WATSON_USERNAME,
  password: WATSON_PASSWORD,
  version: '2018-03-16'
});

var sentiments = {
  positive: '👍',
  neutral: '😑',
  negative: '👎',
};

var emotions = {
  sadness: '😭',
  joy: '😁',
  fear: '😨',
  disgust: '😣',
  anger: '😤',
};



client.get('statuses/user_timeline', {
  screen_name,
  include_rts: false,
  exclude_replies: true
})
.then(res => {
  const { text, created_at, user } = res[0];
  var date = moment(created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY');

  console.log(`${user.name} (@${user.screen_name}) said:\n`);
  console.log(`"${text}"\n`);
  console.log(date.fromNow());

  nlu.analyze({
    features: { emotion: {}, sentiment: {} },
    text
  }, (err, response) => {
    if (err) {
      throw err;
    }

    // score, label
    console.log(response.sentiment.document);
    console.log(response.emotion.document.emotion);
    // loop for max
  });
});
