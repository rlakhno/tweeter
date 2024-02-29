/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Your code goes here  submitTweet, tweetForm
  // Event listener for the submit event on the form
  $("#tweetForm").on("submit", function (event) {
    event.preventDefault();

    // Get tweet text from the form
    const tweetText = $("#tweet-text").val().trim();
    alert(tweetText);

    // Check if tweet text is empty
    if (isTweetValid(tweetText)) {
      alert("Validation is true");

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

  // Validation
  const isTweetValid = function (tweetText) {
    // Check if tweet text is empty
    if (!tweetText) {
      // Notify the user the tweet is not present
      alert("Error: Tweet content cannot be empty");
      return false;
    } else if (tweetText.length > 140) {
      // Notify the user that the tweet content is too long
      alert("Error: Tweet content exceeds the maximum character limit of 140");
      return false;
    } else {

      return true;
    }
  }


  // Define the loadTweets function
  const loadTweets = function () {
    // Make an AJAX GET request to /tweets
    $.get("/tweets")
      .then(tweets => {
        renderTweets(tweets);
      })
      .catch(error => {
        console.error("Error fetching tweets:", error);
        // Handle the error here, such as displaying an error message to the user
      });

  }

  // Call the loadTweets function to load tweets on page load
  loadTweets();


  const renderTweets = function (tweets) {

    // Clear existing tweets from the container
    $('.tweets-container').empty();
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweets-container').prepend($tweet);
    }
  }


  const createTweetElement = function (tweet) {
    // Create a new <article> element for the tweet
    let markup = `<article class="tweet">
      <header>
        <div class="tweet-div">
          <img src=${tweet.user.avatars} alt="Profile Picture">
          <h2>${tweet.user.name}</h2>
        </div>
        <p>${tweet.user.handle}</p>
      </header>
      <p class="tweet-content">${tweet.content.text}</p>
      <div id="under-line"></div>
      <footer>
      <span class="tweet-date">${timeago.format(tweet.created_at)}</span> 
        <div class="tweet-actions">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
      </article>`;

    return markup;

  }

});

/* <article class="tweet">
  <header>
    <div class="tweet-div">
      <img src=${tweet.user.avatars} alt="Profile Picture">
      <h2>${tweet.user.name}</h2>
    </div>
    <p>${tweet.user.handle}</p>
  </header>
  <p class="tweet-content">${tweet.content.text}</p>
  <div id="under-line"></div>
  <footer>
  <span class="tweet-date">${timeago.format(tweet.created_at)}</span> 
    <div class="tweet-actions">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
  </article> */

