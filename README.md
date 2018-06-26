Iron.js
=======

Tweet Sentiment Analyzer
------------------------

The code inside `tweet-analyzer.js` can run sentiment analysis
on the first tweet of a given Twitter user.

Sentiment analysis is done with the [IBM Watson API](https://www.ibm.com/watson/services/natural-language-understanding/).


### Setup

1. You will need Node.js installed in your system.
   Find the latest version here: [nodejs.org](https://nodejs.org/).
2. Open this folder in your terminal and run `npm install`.
3. Create a file called `.env` and put your Twitter
   and IBM Watson credentials inside (see example below).
3. Run `tweet-analyzer.js`  with the `node` command and type in a Twitter handle.
   For example, to use Ironhack's Twitter it would be: `node tweet-analyzer.js ironhack`.


### Example `.env` file

Replace the right side of the equal sign with your credentials.

For the Twitter bearer token, run `node scripts/auth.js`.

```sh
# Twitter application-only credentials
TWITTER_CONSUMER_KEY=tttttttttttttttttttt
TWITTER_CONSUMER_SECRET=wwwwwwwwwwwwwwwwwwww
TWITTER_BEARER_TOKEN=iiiiiiiiiiiiiiiiiiii

# IBM Watson credentials for Natural Language Understanding
WATSON_URL=http://example.com
WATSON_USERNAME=wwwwwwwwwwwwwwwwwwww
WATSON_PASSWORD=aaaaaaaaaaaaaaaaaaaa
```
