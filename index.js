import { tweetsData } from './data.js';
const mInput = document.getElementById('tweet-input');
const mBtn = document.getElementById('tweet-btn');
const feed = document.getElementById('feed');
mBtn.addEventListener('click', () => {
	const contents = mInput.value;
	console.log(contents);
});
document.addEventListener('click',(e)=>{
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
function handleLikeClick(tweetId){
    console.log(tweetId);
    tweetId.forEach((objects)=>)
    /*
Challenge:
1. Iterate over tweetsData and use the uuid 
   saved in tweetId to identify the liked
   tweet's object. Save that object to a 
   new const called 'targetTweetObj'.
⚠️ targetTweetObj should hold an object, NOT
   an array.
2. Increment targetTweetObj's 'likes' count 
   by 1.
3. Log out targetTweetObj
*/
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
