var news = require('./news');
var personify = require('extend');
var message = { mrkdwn: true };
var persona = {
  as_user: false,
  username: 'Trending News',
  icon_emoji: ':newspaper:'
};
personify(message, persona);

module.exports = function(ferd) {

  ferd.listen(/ferd trending/i, function (response) {

    news.results.forEach(function(topic) {
      var attachment = {
        author_name: topic.title,
        author_link: topic.url,
        text: topic.kwic,
        mrkdwn_in: ["text"]
      };
      if (topic.iurl) { 
        attachment.thumb_url = topic.iurl;
      }
      message.attachments = [attachment];
      response.postMessage(message);
    });

  });

};
