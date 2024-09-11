import { tweetsData } from "./data.js";
const mInput = document.getElementById('tweet-input')
const mBtn = document.getElementById('tweet-btn')
const feed = document.getElementById('feed')
mBtn.addEventListener('click', ()=>{
 const contents = mInput.value
    console.log(contents);
    
})
function getFeedHtml(){

    let feedHtml=''
    tweetsData.forEach(tweet => {
        const profilePic = tweet.profilePic
        const tweetHandle = tweet.handle
        const text = tweet.tweetText
        const replies = tweet.replies
        const likes = tweet.likes
        const retweets = tweet.retweets
        feedHtml = `<div class="tweet">
        <div class="tweet-inner">
            <img src="${profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweetHandle}</p>
                <p class="tweet-text">${text}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                    ${replies}
                    </span>
                    <span class="tweet-detail">
                    ${likes}
                    </span>
                    <span class="tweet-detail">
                     ${retweets}
                    </span>
                </div>   
            </div>            
        </div>
    </div>
    `
    });
console.log(feedHtml);


}

getFeedHtml()
function render(){
    
}