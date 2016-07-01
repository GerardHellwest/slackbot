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

/*var users = bot.api.channels.users.list({},function(err,response) {
  users(toString);
});*/

controller.hears(['hello'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Oh Hai! Did you say something?' + Date());
});

controller.hears(['hey', 'howdy', 'hi'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Hey yourself, do you want to use Nicknames?' );
});

controller.hears(['okay', 'yes', 'ok', 'sure'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, "I'm going to call you Bruce to save any confusion! " + Date());
});

controller.hears(['users', 'who', 'online', 'channel'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, "Here, Bruce, is a list of users on this channel: " + users)
});




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