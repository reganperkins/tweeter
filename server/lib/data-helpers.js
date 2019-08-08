'use strict';

module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: (newTweet, callback) => {
      db.collection('tweeter').insertOne(newTweet, callback);
    },

    getTweets: (callback) => {
      const sortNewestFirst = (a, b) => b.created_at - a.created_at;
      db.collection('tweeter').find().toArray((err, tweets) => {
        callback(null, tweets.sort(sortNewestFirst));
      });
    },
  };
};
