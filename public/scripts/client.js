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

    // Serialize the form data into a query string
    const formData = $(this).serialize();
    console.log("Form data:", formData); // Log the form data to the console


    // Send an AJAX POST request to the server
    $.ajax({
      type: "POST",
      url: "/tweets", // Update the URL as per your server route
      data: formData,
      success: function (response) {
        // If the request is successful, render the new tweet
        renderTweets(response); // Assuming you have a function to render a single tweet
      },
      error: function (error) {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      }
    });


  });
  // Define the loadTweets function
  const loadTweets = function () {
    // Make an AJAX GET request to /tweets
    $.ajax({
      type: "GET",
      url: "/tweets",
      dataType: "json",
      success: function (tweets) {
        // Call the renderTweets function and pass the array of tweets
        renderTweets(tweets);
      },
      error: function (error) {
        console.log("Error fetching tweets", error);
      }
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
      $('.tweets-container').append($tweet);
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

