/*
var Twit = require('twit');
var request = require('request');

var TwitterBot = require('node-twitterbot').TwitterBot;

//instantiate bot object
var Bot = new TwitterBot({
 //following 4 values stored in Heroku  as well as locally
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});
//set url for yomamma joke API
var url = "http://api.yomomma.info/";
var queryString ="";
var theJoke="";


//set phrase array to tweet from if unable to connect to yomama api
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

					//choose random phrase from array
function chooseRandom(myArray) {
  return myArray[Math.floor(Math.random() * myArray.length)];
}

var phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);



//set to go off every 24 hours
setInterval( twitterTask, 1000*60*60*24);


function twitterTask(){

    // create tweet, send to Twitter
	request( {uri : url, qs: queryString} , function(error, api_response, body){
 // if got response with no errors
 if (!error && api_response.statusCode == 200){
theJoke=JSON.parse(body);//make joke into json
theJoke=theJoke.joke;// get the actual joke string
 Bot.tweet(theJoke);//tweet the joke
 console.log("Bot tweeted \n"+theJoke);
 }//end of if got response back
else{
	//tweet from random phrase array
	Bot.tweet(phrase);
}//end of if error connecting to joke ApI
});
  

}



//make second bot using twit for retweeting
//----------------------------------------------------------------------

//retweeting bot
var TWITTER_SEARCH_PHRASE = '#Minnesota OR #Joke';//search for posts with these hashtags

//instantiate second bot
var Bot2 = new Twit({
	//use following 4 values stored remotely on heroku and locally
	consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

console.log('bot2 is running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	Bot2.post('statuses/retweet/:id', { id: '669520341815836672' }, BotInitiated);
	
	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot2 could not be initiated, : ' + error);
		}
		else {
  			console.log('Bot2 initiated');
		}
	}
	
	BotRetweet();
}

/* BotRetweet() : To retweet the matching recent tweet */
function BotRetweet() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot2.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot2.post('statuses/retweet/:id', id, BotRetweeted);
			
			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
				}
				else {
					console.log('Bot retweeted : ' + id.id);
				}
			}
		}
	}
	//every 24 hours
	setInterval(BotRetweet, 24*60*60*1000);
}

/* Initiate the Bot */
BotInit();
*/