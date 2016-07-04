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

/*var reply_with_attachments = {
    'random image from my life': randomImage(image); 
    }
  bot.reply(message, reply_with_attachments);
});
*/

controller.hears(['hello'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Oh Hai! Did you say something?');
});

controller.hears(['hey', 'howdy', 'hi'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, 'Hey yourself, do you want to use Nicknames?' );
});


controller.hears(['okay', 'yes', 'ok', 'sure'], ['mention'], function(whichBot, message) {
  whichBot.reply(message, "I'm going to call you Bruce to save any confusion! " + randomImage(images));
  bot.reply(message, reply_with_attachments);
});

controller.hears(['list of users', 'who is', 'users list'], ['mention'], function(whichBot, message) {
    bot.api.users.list({},function(err,response){
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

/*controller.hears('another_keyword','direct_message,direct_mention',function(bot,message) {
  var reply_with_attachments = {
    'username': 'My bot' ,
    'text': 'This is a pre-text',
    'attachments': [
      {
        'fallback': 'To be useful, I need you to invite me in a channel.',
        'title': 'How can I help you?',
        'text': 'To be useful, I need you to invite me in a channel ',
        'color': '#7CD197'
      }
    ],
    'icon_url': 'http://lorempixel.com/48/48'
    }

  bot.reply(message, reply_with_attachments);
});
*/
/*
1 respond to hello
2 respond  to informal greeting with invite to use nickname
3 give user the nickname Bruce (montypython reference) and a random image 
4 generate a list of users
5 Ask about the election and use an if else if statement???
*/