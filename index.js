import { tweetsData } from './data.js';
const mInput = document.getElementById('tweet-input');
const mBtn = document.getElementById('tweet-btn');
const feed = document.getElementById('feed');
mBtn.addEventListener('click', () => {
	const contents = mInput.value;
	console.log(contents);
});
function getFeedHtml() {
	let feedHtml = '';
    let profilePic
    let tweetHandle 
    let text 
    let replies
    let likes 
    let retweets 
	tweetsData.forEach((tweet) => {
		 profilePic = tweet.profilePic;
		 tweetHandle = tweet.handle;
		 text = tweet.tweetText;
		 replies = tweet.replies;
		 likes = tweet.likes;
		 retweets = tweet.retweets;
		feedHtml += `<div class="tweet">
        <div class="tweet-inner">
            <img src="${profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweetHandle}</p>
                <p class="tweet-text">${text}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    <i class='fa-regular fa-comment-dots'/>
                    ${replies}
                    </span>
                    <span class="tweet-detail">
                    <i class='fa-solid fa-heart'/>

                    ${likes}
                    </span>
                    <span class="tweet-detail">
                    <i class='fa-regular fa-retweet'/>

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
	/*   Challenge:
1. Take control of the ‘feed’ div.
2. Render the HTML returned by the getFeedHtml 
   function to the 'feed' div. 
   See if you can do this with just one line of code!
*/
	feed.innerHTML = getFeedHtml();
}
render();
