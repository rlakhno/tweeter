// composer-char-counter.js

$(document).ready(function() {
  // Event handler for input in the textarea
  $('.new-tweet textarea').on('input', function() {
    // Determine the length of the input value
    let inputLength = $(this).val().length;

    // Update the counter on the page
    $(this).closest('.new-tweet').find('.counter').text(140 - inputLength);

    // Adjust counter color based on character limit
    let counter = $(this).closest('.new-tweet').find('.counter');
    if (inputLength > 140) {
      counter.addClass('over-limit');
    } else {
      counter.removeClass('over-limit');
    }
  });
});
