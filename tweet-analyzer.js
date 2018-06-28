// Setup
// -----------------------------------------------------------------------------
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
  WATSON_PASSWORD,
} = process.env;

const [ ,, screen_name ] = process.argv;


var client = new Twitter({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  bearer_token: TWITTER_BEARER_TOKEN,
});

var nlu = new NaturalLanguageUnderstandingV1({
  url: WATSON_URL,
  username: WATSON_USERNAME,
  password: WATSON_PASSWORD,
  version: '2018-03-16',
});



// Main Program
// -----------------------------------------------------------------------------
client.get('statuses/user_timeline', {
  screen_name,
  tweet_mode: 'extended',
  include_rts: false,
  exclude_replies: true,
})
.then(twitterResponse => {
  const { user, full_text, created_at } = twitterResponse[0];

  printTweet(user, full_text);

  var date = moment(created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY');
  console.log(date.fromNow());

  nlu.analyze({
    features: { emotion: {}, sentiment: {} },
    text: full_text,
  }, (err, watsonResponse) => {
    if (err) {
      throw err;
    }

    const {
      sentiment: { document: sentiment },
      emotion: { document: { emotion } },
    } = watsonResponse;

    printSentiment(sentiment);
    printEmotion(emotion);
  });
});



// Functions
// -----------------------------------------------------------------------------
function printTweet (user, text) {
  console.log(`\n${user.name} (@${user.screen_name}) said:\n`);

  var lines = text.split('\n');
  for (let line of lines) {
    console.log(`| ${line}`);
  }
  console.log('');
}


function printSentiment (data) {
  var emoji = {
    positive: '👍',
    neutral: '😑',
    negative: '👎',
  };

  const { score, label } = data;
  let prettyScore = Math.abs(Math.round(score * 100));

  if (label === 'neutral') {
    prettyScore = 100 - prettyScore;
  }

  console.log(`\nThe sentiment is ${label} ${emoji[label]} (${prettyScore}%).`);
}


function printEmotion (data) {
  var emoji = {
    sadness: '😭',
    joy: '😁',
    fear: '😨',
    disgust: '😣',
    anger: '😤',
  };

  var strongestName = "";
  var strongestScore = 0;

  for (let name of Object.keys(data)) {
    if (data[name] > strongestScore) {
      strongestName = name;
      strongestScore = data[name];
    }
  }

  const prettyScore = Math.abs(Math.round(strongestScore * 100));

  console.log(`The prevailing emotion is ${strongestName} ${emoji[strongestName]} (${prettyScore}%).`);
}
