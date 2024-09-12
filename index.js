import { tweetsData } from './data.js';
const mInput = document.getElementById('tweet-input');
const mBtn = document.getElementById('tweet-btn');
const feed = document.getElementById('feed');
mBtn.addEventListener('click', () => {
	const contents = mInput.value;
});
document.addEventListener('click', (e) => {
	if (e.target.dataset.like) {
		handleLikeClick(e.target.dataset.like);
	}
	function handleLikeClick(tweetId) {
		const targetTweetObj = tweetsData.filter((tweet) => {
			return tweet.uuid === tweetId;
		})[0];
		if (!targetTweetObj.isLiked) {
			targetTweetObj.likes++;
			targetTweetObj.isLiked = true;
		} else {
			targetTweetObj.isLiked = false;
			targetTweetObj.likes--;
		}

		console.log(targetTweetObj);
		render();
	}
});
function getFeedHtml() {
	let feedHtml = '';
	tweetsData.forEach((tweet) => {
		const profilePic = tweet.profilePic;
		const tweetHandle = tweet.handle;
		const text = tweet.tweetText;
		const replies = tweet.replies;
		const likes = tweet.likes;
		const retweets = tweet.retweets;
		const id = tweet.uuid;
		feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweetHandle}</p>
                <p class="tweet-text">${text}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply=${id}></i>
                    ${replies.length}
                    </span>

                    <span class="tweet-detail">
                    <i class="fa-solid fa-heart"data-like=${id}></i>

                    ${likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet"data-=${id}></i>
                     ${retweets}
                    </span>
                </div>   
            </div>            
        </div>
    </div>
    `;
	});
	return feedHtml;
}

function render() {
	feed.innerHTML = getFeedHtml();
}
render();
