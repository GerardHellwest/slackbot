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

//var userList = () => createArray.user.list;

controller.hears(['hello'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Oh Hai! Did you say something?' + Date());
});

controller.hears(['hey' || 'howdy'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Hey yourself, do you want to use Nicknames?' + Date());
});




/*controller.hears(['name'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, "Hi, what's your name?");
});*/
/*
1 respond to hello
2 respond  to informal greeting with invite to use nickname
3 give user a nickname or can I get them to choose a nickname from a list?
4 generate a list of users
5 Notify me whenever my name is on a list i.e. whenever a user.list has been generated
*/
