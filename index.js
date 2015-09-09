var news = require('./news');

var handler = function (data, ferd) {

  var sendMessage = function (message, attachment) {
    var params = {
      channel: data.channel,
      as_user: false,
      username: 'Ferd',
      icon_emoji: ':newspaper:',
      mrkdwn: true
    };
    if (message) {
      params.text = message;
    }
    if (attachment) {
      params.attachments = JSON.stringify([attachment]);
    }
    return ferd.sendMessage(params);
  };

  var attachments = [];

  news.results.forEach(function (topic) {
    var attachment = {
      author_name: topic.title,
      author_link: topic.url,
      text: topic.kwic,
      fallback: topic.title,
      mrkdwn_in: ["text"]
    };
    if (topic.iurl) { 
      attachment.thumb_url = topic.iurl;
    }
    attachments.push(attachment);
  });

  sendMessage("Meanwhile, in trending news: ")
    .then(function (){
      attachments.forEach(function (item) {
        sendMessage(null, item);
      });  
    });

};

module.exports = function (data, ferd) {
  handler(data, ferd);
};
