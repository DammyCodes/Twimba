import { tweetsData } from "./data.js"

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
  


const tweetInput = document.getElementById("tweet-input")


// tweetBtn.addEventListener('click', function(){
//     console.log(tweetInput.value) 
//     tweetInput.value = ''
// })

document.addEventListener('click', function(e) {
    if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    }
    if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    if(e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    }
    if (e.target.id === 'tweet-btn') {
       handleTweetBtnClick()
    }
})


function handleLikeClick(tweetId){ 
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    console.log(render())
}

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweetId === tweet.uuid
    })[0]

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    }
    else {
        targetTweetObj.retweets++
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick() {

    if (tweetInput.value) {
        tweetsData.unshift(
            {
                handle: `@DammyCodes ✅`,
                profilePic: `images/bulb.jpg`,
                likes: 0,
                retweets: 0,
                tweetText: `${tweetInput.value}`,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            }
        )
        render()
        tweetInput.value = ''
    }
   
}


function getTweetHtml() {
    
    let tweetHtml = ``
    
    tweetsData.forEach(function(tweet) {

        let replyHtml = ``
        tweet.replies.forEach(function(reply) {
           

            replyHtml += `
    <div class="tweet-reply-div">
        <img src="${reply.profilePic}" class="tweet-img">
        <div>
            <p class="handle">${reply.handle}</p>
            <p class="tweet-text">${reply.tweetText}</p>
        </div>
    </div>
    
            `
            if (reply.length > 0) {
                console.log(replyHtml)
            }
            
        })
       

        let likeIconClass = ''

        let reTweetIconClass = ''

        if (tweet.isLiked) {
            likeIconClass = 'liked'
        }

        if (tweet.isRetweeted) {
            reTweetIconClass = 'retweeted'
        }

        tweetHtml += `
        <div class="tweet-div">
            <img src="${tweet.profilePic}" class="tweet-img">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="icon-info">
                    <span class="icon">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                    </span>

                    <span class="icon">
                    <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                    </span>

                    <span class="icon">
                    <i class="fa-solid fa-retweet  ${reTweetIconClass}" data-retweet ="${tweet.uuid}"></i>
                    ${tweet.retweets}
                    </span>
                </div>
            </div>
        </div>
        <div class="reply-feed hidden" id="replies-${tweet.uuid}">${replyHtml}</div>
        `  
        
    }) 
    return tweetHtml
}

function render() {
    document.getElementById("tweets").innerHTML = getTweetHtml()
}

render()

