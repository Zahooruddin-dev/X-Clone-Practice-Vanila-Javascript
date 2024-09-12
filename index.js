import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';
const feed = document.getElementById('feed');
document.addEventListener('click', (e) => {
	if (e.target.dataset.like) {
		handleLikeClick(e.target.dataset.like);
	}
    else	if (e.target.dataset.retweet) {
		handleRetweetClick(e.target.dataset.retweet);
	}
   else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else  if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
});
function handleReplyClick(replyId){
    const replyElement = document.getElementById(`replies-${replyId}`);
    if (replyElement) {
      replyElement.classList.toggle('hidden');
    } else {
      console.error(`Element with ID "replies-${replyId}" not found.`);
    }
}
function handleLikeClick(tweetId) {
	const targetTweetObj = tweetsData.filter((tweet) => {
		return tweet.uuid === tweetId;
	})[0];
	if (!targetTweetObj.isLiked) {
		targetTweetObj.likes++;
	} else {
		targetTweetObj.likes--;
	}
	targetTweetObj.isLiked = !targetTweetObj.isLiked;
	render();
}
function handleRetweetClick(tweetId) {
	const targetTweetObj = tweetsData.filter((tweet) => {
		return tweet.uuid === tweetId;
	})[0];
	if (!targetTweetObj.isRetweeted) {
		targetTweetObj.retweets++;
	} else {
		targetTweetObj.retweets--;
	}
	targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
	render();
}
function handleTweetBtnClick (){
    const mInput = document.getElementById('tweet-input'); 
    if(!mInput.value.trim()){
        console.log('empty');
        return
    }
    const newTweet={
    handle: `@MuhammadZahooruddin `,
    profilePic: `images/gg.webp`,
    likes: 0,
    retweets: 0,
    tweetText: `${mInput.value}`,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: uuidv4()
};
tweetsData.unshift(newTweet);

mInput.value =''
render()

}
function getFeedHtml() {
	let feedHtml = '';
	tweetsData.forEach((tweet) => {
		let likeIconClass = '';
		let retweetIconClass = '';
		likeIconClass = tweet.isLiked && 'Liked';
		retweetIconClass = tweet.isRetweeted && 'retweeted';
		let repliesHtml = '';
		if (tweet.replies.length > 0) {
			tweet.replies.forEach((reply) => {
				repliesHtml += `<div class="tweet-reply">
        <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
        </div>`;
			});
		} 
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
                    <i class="fa-solid fa-heart ${likeIconClass}"data-like=${id}></i>
                    ${likes}
                    </span>
                    <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"data-retweet=${id}></i>
                     ${retweets}
                    </span>
                </div>   
            </div>            
        </div>
           <div id="replies-${id}">
       ${repliesHtml}
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
