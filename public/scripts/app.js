/* eslint-disable no-undef */

const testUser = {
  user: {
    name: 'Newton',
    avatars: {
      small: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png',
      regular: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png',
      large: 'https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png',
    },
    handle: '@SirIsaac',
  },
  content: {
    text: 'If I have seen further it is by standing on the shoulders of giants',
  },
  created_at: 1461116232227,
};

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
  const $image = $('<img>').attr('src', post.user.avatars.small).addClass('avatar');
  const $title = $('<h3>').text(post.user.name);
  const $handle = $('<span>').addClass('handle').text(post.user.handle);
  const $message = $('<div>').addClass('post-content').text(post.content.text);
  const $footer = $('<footer>');
  const $timestamp = $('<span>').text(createDateTagline(post.created_at));

  const $postHTML = $post.append(
    $header.append($image, [$title, $handle]),
    [$message, $footer.append($timestamp)],
  );

  $('#posts').html($postHTML);
  return $postHTML;
}

$(document).ready(() => {
  createTweetElement(testUser);
});
