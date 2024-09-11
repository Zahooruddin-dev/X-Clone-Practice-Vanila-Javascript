import { tweetsData } from './data.js';
const mInput = document.getElementById('tweet-input');
const mBtn = document.getElementById('tweet-btn');
const feed = document.getElementById('feed');
mBtn.addEventListener('click', () => {
	const contents = mInput.value;
	console.log(contents);
});
document.addEventListener('click',(e)=>{
    console.log(e.target.dataset.like);
    
    /*
Challenge:
1. When a like icon is clicked, this function 
   should log out the contents of the 'data-like' 
   data-attribute.

⚠️ Clicking on the page but not on the like icon
   will log out 'undefined'. That is absolutely fine.
*/
function handleLikeClick(e){
    
}
})
function getFeedHtml() {
	let feedHtml = '';
	tweetsData.forEach((tweet) => {
		const profilePic = tweet.profilePic;
		const tweetHandle = tweet.handle;
		const text = tweet.tweetText;
		const replies = tweet.replies;
		const likes = tweet.likes;
		const retweets = tweet.retweets;
        const id = tweet.uuid
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
	console.log(feedHtml);

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
