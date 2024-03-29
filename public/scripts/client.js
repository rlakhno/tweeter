/*
 * Client-side JS logic
 */
$(document).ready(function() {
  // Hide error message on page load
  $('#error-message').hide();

  // Event listener for the submit event on the form
  $("#tweetForm").on("submit", function(event) {
    event.preventDefault();

    // Hide error message if it's visible
    $('#error-message').slideUp();

    // Get the tweet text from the form and trim leading/trailing whitespace
    const tweetText = $("#tweet-text").val().trim();

    // Validate the tweet text
    if (isTweetValid(tweetText)) {

      // Serialize the form data into a query string
      const formData = $(this).serialize();

      // Send an AJAX POST request to the server
      $.post("/tweets", formData)
        .then(() => {
          loadTweets();
        })
        .catch(error => {
          console.error("Error posting tweet:", error);
          // Handle the error here, such as displaying an error message to the user
        });
    }

  });

  // Define the loadTweets function
  const loadTweets = function() {
    // Make an AJAX GET request to /tweets
    $.get("/tweets")
      .then(tweets => {
        renderTweets(tweets);
      })
      .catch(error => {
        console.error("Error fetching tweets:", error);
        // Handle the error here, such as displaying an error message to the user
      });

  };

  // Call the loadTweets function to load tweets on page load
  loadTweets();

  // Validation
  const isTweetValid = function(tweetText) {
    // Check if tweet text is empty
    if (!tweetText) {
      // Show error message
      $('#error-message').text("Error: Tweet content cannot be empty").slideDown();
      return false;
    } else if (tweetText.length > 140) {
      // Show error message
      $('#error-message').text("⚠️ Error: Tweet content exceeds the maximum character limit of 140 ⚠️ ").slideDown();
      return false;
    }
    // Tweet is valid
    return true;
  };

  // Function to create a tweet element with user-generated content
  const createTweetElement = function(tweet) {
    const $tweet = $("<article>").addClass("tweet");

    // Generate the HTML markup for the tweet header
    const $header = $("<header>").appendTo($tweet);
    $("<div>").addClass("tweet-div")
      .append($("<img>").attr("src", tweet.user.avatars).attr("alt", "Profile Picture"))
      .append($("<h2>").text(tweet.user.name))
      .appendTo($header);
    $("<p>").text(tweet.user.handle).appendTo($header);

    // Generate the HTML markup for the tweet content using .text()
    $("<p>").addClass("tweet-content").text(tweet.content.text).appendTo($tweet);

    // Generate the HTML markup for the tweet footer
    const $footer = $("<footer>").appendTo($tweet);
    $("<span>").addClass("tweet-date").text(timeago.format(tweet.created_at)).appendTo($footer);
    $("<div>").addClass("tweet-actions")
      .append($("<i>").addClass("fas fa-flag"))
      .append($("<i>").addClass("fas fa-retweet"))
      .append($("<i>").addClass("fas fa-heart"))
      .appendTo($footer);

    return $tweet;
  };

  // Function to render tweets
  const renderTweets = function(tweets) {
    // Clear existing tweets from the container
    $('.tweets-container').empty();
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').prepend($tweet);
    }
  };
});
