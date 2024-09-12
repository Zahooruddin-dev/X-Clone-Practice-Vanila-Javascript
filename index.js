import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';

const feed = document.getElementById('feed');

// Load tweets from localStorage on page load
const savedTweets = JSON.parse(localStorage.getItem('tweetsData'));
if (savedTweets) {
    tweetsData.length = 0; // Clear the original tweetsData
    tweetsData.push(...savedTweets); // Load saved tweets
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    }
    else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet);
    }
    else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    }
    else if (e.target.dataset.addReply) {
        handleAddReplyClick(e.target.dataset.addReply);
    }
    else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick();
    }
});

function handleReplyClick(replyId) {
    const replyElement = document.getElementById(`replies-${replyId}`);
    if (replyElement) {
        replyElement.classList.toggle('hidden');
    } else {
        console.error(`Element with ID "replies-${replyId}" not found.`);
    }
}

function handleAddReplyClick(tweetId) {
    const replyInput = document.getElementById(`reply-input-${tweetId}`);
    const replyText = replyInput.value.trim();
    if (!replyText) return;

    const targetTweetObj = tweetsData.find((tweet) => tweet.uuid === tweetId);
    const newReply = {
        handle: '@YourHandle', // Change this to the current user handle
        profilePic: 'images/profile-pic.webp',
        tweetText: replyText,
        uuid: uuidv4()
    };

    targetTweetObj.replies.push(newReply);
    replyInput.value = ''; // Clear the input field

    saveTweetsToLocalStorage(); // Save updated data to localStorage
    render();
}

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.find((tweet) => tweet.uuid === tweetId);
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    targetTweetObj.likes += targetTweetObj.isLiked ? 1 : -1;

    saveTweetsToLocalStorage(); // Save updated data to localStorage
    render();
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.find((tweet) => tweet.uuid === tweetId);
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    targetTweetObj.retweets += targetTweetObj.isRetweeted ? 1 : -1;

    saveTweetsToLocalStorage(); // Save updated data to localStorage
    render();
}

function handleTweetBtnClick() {
    const mInput = document.getElementById('tweet-input');
    if (!mInput.value.trim()) {
        console.log('empty');
        return;
    }

    const newTweet = {
        handle: '@Mizuka',
        profilePic: 'images/gg.webp',
        likes: 0,
        retweets: 0,
        tweetText: mInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    };

    tweetsData.unshift(newTweet);
    mInput.value = ''; // Clear the input field

    saveTweetsToLocalStorage(); // Save new tweet to localStorage
    render();
}

function saveTweetsToLocalStorage() {
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData));
}

function getFeedHtml() {
    let feedHtml = '';
    tweetsData.forEach((tweet) => {
        let likeIconClass = tweet.isLiked ? 'Liked' : '';
        let retweetIconClass = tweet.isRetweeted ? 'retweeted' : '';

        let repliesHtml = '';
        if (tweet.replies.length > 0) {
            tweet.replies.forEach((reply) => {
                repliesHtml += `<div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="images/gg.webp" class="profile-pic">
                        <div>
                            <p class="handle">@Mizuka</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>`;
            });
        }

        repliesHtml += `
            <div class="reply-input">
                <input id="reply-input-${tweet.uuid}" type="text" placeholder="Reply..." class="reply-text-input"/>
                <button data-add-reply="${tweet.uuid}" class="reply-btn">Reply</button>
            </div>
        `;

        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-reply=${tweet.uuid}></i> ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}" data-like=${tweet.uuid}></i> ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet=${tweet.uuid}></i> ${tweet.retweets}
                        </span>
                    </div>
                </div>
            </div>
            <div id="replies-${tweet.uuid}" class="hidden">
                ${repliesHtml}
            </div>
        </div>`;
    });
    return feedHtml;
}

function render() {
    feed.innerHTML = getFeedHtml();
}

render();
