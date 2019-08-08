/* eslint-disable no-undef */

function createDateTagline(timestamp) {
  const createdAt = new Date(timestamp).setHours(0, 0, 0, 0);
  const todaysDate = new Date().setHours(0, 0, 0, 0);
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const daysPassed = (todaysDate - createdAt) / millisecondsInDay;
  const dayText = daysPassed > 9 ? 'days' : 'day';

  return `${daysPassed} ${dayText} ago`;
}

function createTweetElement(post) {
  const $post = $('<article>').addClass('post');
  const $header = $('<header>');
  const $image = $('<img>').attr('src', post.user.avatars).addClass('avatar');
  const $title = $('<h3>').text(post.user.name);
  const $handle = $('<span>').addClass('handle').text(post.user.handle);
  const $message = $('<div>').addClass('post-content').text(post.content.text);
  const $footer = $('<footer>');
  const $timestamp = $('<span>').text(createDateTagline(post.created_at));

  const $postHTML = $post.append(
    $header.append($image, [$title, $handle]),
    [$message, $footer.append($timestamp)],
  );

  return $postHTML;
}

function renderTweets(posts) {
  posts.forEach(post => $('#posts').append(createTweetElement(post)));
}

function loadTweets() {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweets) => {
      renderTweets(tweets);
    });
}

function getTweetFormError() {
  const text = $('#new-tweet-text').val();
  let error = false;

  if (text < 1) error = 'you must provide a tweet';
  if (text.length > 141) error = 'tweet is too long';

  return error;
}

function renderFormError(error) {
  $('#new-tweet .error-message').text(error);
  $('#new-tweet .error-message').slideToggle();
}

function createTweet() {
  $.ajax('/tweets', {
    method: 'POST',
    data: $(this).serialize(),
  })
    .done((tweet) => {
      $('#tweet-form')[0].reset();
      $('#posts').prepend(createTweetElement(tweet));
    });
}

function submitTweet(e) {
  e.preventDefault();
  const error = getTweetFormError();
  if (error) {
    renderFormError(error);
    return;
  }

  const formError = $('#new-tweet .error-message');
  if (formError.is(':visible')) {
    formError.slideToggle(100);
  }

  createTweet.call(this);
}

$(document).ready(() => {
  loadTweets();
  $('#tweet-form').submit(submitTweet);
});
