var Twit = require('twit');
var TwitterBot = require('node-twitterbot').TwitterBot;
var Bot = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

var phraseArray = [ "hey twitter",
                    "im tweeting",
                    "tweet tweet",
                    "tweetstorm time... 1/22",
                    "plz RT v important",
                    "delete ur account",
                    "it me",
                    "same",
                    "#dogpants go on 4 legs!!",
                    "#thedress is blue and black" ];

function chooseRandom(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

var phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);



setInterval( twitterTask, 1000*60*60*24);


function twitterTask(){

    // create tweet, send to Twitter
	Bot.tweet(phrase);


}


//module.exports = Bot;