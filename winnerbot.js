var Twit = require('twit');

var Bot = new Twit({
    consumer_key:         '7wnv8aRjEJOJSpJA6IMZE3ncu'
    , consumer_secret:      '8IxX5vHR5OVar6RHdJZcLDCI6jsMQokTpCvmuvyJAXzsT1yTsX'
    , access_token:         '4587834493-jSxcSNDTdt3pNRyNJ4IHUMlI0FT2tCsWgBYRFmZ'
    , access_token_secret:  'wJ1DjYetHCRg10c4ABcLAHSKMv2wxWAlzin8cPwwaJ395'
});

var contestStream = Bot.stream(
    'statuses/filter',
    {track: 'rt to win,chance to win,retweet to win'});

findContests();

function findContests() {
    
    console.log('in func findContests');
    contestStream.on('tweet', function(tweet) {
	enterContest(tweet);
    });
};


function enterContest(tweet) {

    console.log('in func enterContest');
    console.log('Handle: ' + tweet.user.screen_name);
    console.log(tweet.text);

    //Very crude idea of what I want to be doing when I find a tweet with
    //a contest. Retweet, like, and follow.
    Bot.post('statuses/retweet/:id',
	     {id: tweet.id_str},
	     function(err, data, response) {
		 if (err) throw err;
		 console.log(data);
	     });

    Bot.post('favorites/create',
	     {id: tweet.id_str},
	     function(err, data, response) {
		 if (err) throw err;
		 console.log(data);
	     });

    Bot.post('friendships/create',
	     {id: tweet.user.id_str},
	     function(err, data, response) {
		 if (err) throw err;
		 console.log(data);
	     });
};


