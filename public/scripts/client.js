/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Your code goes here  submitTweet, tweetForm
   // Event listener for the submit event on the form
$("#tweetForm").on("submit", function(event) {
  alert("Handler for `submit` called.");
  event.preventDefault();

     // Serialize the form data into a query string
     const formData = $(this).serialize();
     console.log("Form data:", formData); // Log the form data to the console


        // Send an AJAX POST request to the server
    $.ajax({
      type: "POST",
      url: "/tweets", // Update the URL as per your server route
      data: formData,
      success: function(response) {
        // If the request is successful, render the new tweet
        renderTweets(response); // Assuming you have a function to render a single tweet
      },
      error: function(error) {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      }
    });


});

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis Hello Rossy"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.tweets-container').append($tweet); 
  }
}


const createTweetElement = function(tweet) {
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
    <span class="tweet-date">${tweet.created_at}</span>
    <div class="tweet-actions">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
  </article>`;

  return markup;
  
}

renderTweets(data);

});

/* <article class="tweet">
<header>
  <div class="tweet-div">
    <img src="/images/image-boy.png" alt="Profile Picture">
    <h2>Username</h2>
  </div>
  <p>@username</p>
</header>
<p class="tweet-content">The way to get started is to quit talking and begin doing</p>
<div id="under-line"></div>
<footer>
  <span class="tweet-date">5 day ago</span>
  <div class="tweet-actions">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
</footer>
</article> */

