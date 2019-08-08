/* eslint-disable no-undef */

function toggleTweetForm() {
  $('#new-tweet').slideToggle(400, () => {
    $('#new-tweet-text').focus();
  });
}

$(document).ready(() => {
  $('#toggle-btn').click(toggleTweetForm);
});
