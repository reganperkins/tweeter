/* eslint-disable no-undef */
/* eslint-disable func-names */

// eslint-disable-next-line prefer-arrow-callback
$(document).ready(function () {
  $('#new-tweet-text').on('input', function () {
    const currentTextLength = $(this).val().length;
    const textLimit = 140;
    const remainingChars = textLimit - currentTextLength;
    const counter = $(this).siblings('.counter');
    const isDangerText = counter.hasClass('danger-text');

    counter.text(remainingChars);

    if (remainingChars < 0 && !isDangerText) {
      counter.addClass('danger-text');
    } else if (remainingChars >= 0 && isDangerText) {
      counter.removeClass('danger-text');
    }
  });
});
