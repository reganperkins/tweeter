/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */

$(document).ready(() => {
  $('#tweet-form').submit(function (e) {
    e.preventDefault();
    const text = $('#new-tweet-text').val();
    let error = false;
    if (text < 1) error = 'you must provide a tweet';
    if (text.length > 141) error = 'tweet is too long';

    if (error) {
      console.warn(error);
      return;
    }
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize(),
    })
      .then(function () {
        console.log(arguments)
        $('#tweet-form')[0].reset();
      });
  });
});
