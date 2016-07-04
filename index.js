/**
 * Your slackbot token is available as the global variable:

process.env.SLACKBOT_TOKEN

 * When deployed to now.sh, the URL of your application is available as the
 * global variable:

process.env.NOW_URL

 * The URL is useful for advanced use cases such as setting up an Outgoing
 * webhook:
 * https://github.com/howdyai/botkit/blob/master/readme-slack.md#outgoing-webhooks-and-slash-commands
 *
 */
var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
  token: process.env.SLACKBOT_TOKEN
});
bot.startRTM(function(error, whichBot, payload) {
  if (error) {
    throw new Error('Could not connect to Slack');
  }
});

var images = [
'https://js1syd.slack.com/files/gerardwilson/F1NFSU0H3/bullittchase.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NFG7HE0/bullitt-1968-steve-mcqueen.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NFJDXL6/gwx-20130913_124010.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NFSUWN9/gwx-20130923_125627.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NFZFRCZ/gwx-20130923_125700.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NFZGEM7/gwx-20130926_114234.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NFJGTGE/gwx-20130926_114257.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NG3JQMQ/scamper-waiting.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NFSU6LX/leonard-nimoy-llap.jpg',
'https://js1syd.slack.com/files/gerardwilson/F1NFSTWKH/jane-brown-michael-caine.png'
]

var randomImage = function(images){
  return images[Math.floor(Math.random()*images.length)];
}


controller.hears(['hello'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Oh Hai! Did you say something?');
});

controller.hears(['hey', 'howdy', 'hi'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Hey yourself, do you want to use Nicknames?' );
});


controller.hears(['okay', 'yes', 'ok', 'sure'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, "I'm going to call you Bruce to save any confusion! " + randomImage(images));
});

controller.hears(['who goes there'], ['mention'], function(whichBot, message) {
    bot.api.users.list({},function(err,response) {
      var memberNames = []
      response.members.forEach(function(member){
        memberNames.push(member.name)
      })
      console.log(memberNames)
      whichBot.reply(message, memberNames.join(', '));
    })
});

/*controller.hears(['users', 'who', 'online', 'channel'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, "Here, Bruce, is a list of users on this channel: " + users)
});*/




/*controller.hears(['name'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, "Hi, what's your name?");
});*/
/*
1 respond to hello
2 respond  to informal greeting with invite to use nickname
3 give user a nickname or can I get them to choose a nickname from a list? replyInteractive
4 generate a list of users
5 Notify me whenever my name is on a list i.e. whenever a user.list has been generated Listener
*/

/*bot.api.users.list

bot.api.channels.list({},function(err,response) {
  
})
*/

//dud 
/*var users = bot.api.channels.users.list({},function(err,response) {
  users(toString);
});*/