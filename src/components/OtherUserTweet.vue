/ 其他使用者Profile下方推文列表
<template>
  <div class="tweet-container">
    <!-- Profile頁面下方的推文列表 -->
    <div v-if="noReply" class="noReply">
      <span> 目前沒有任何推文 </span>
    </div>
    <div v-else class="tweet-list">
      <div class="tweet-item" v-for="tweet in tweets" :key="tweet.id">
        <div class="user-avatar">
          <router-link :to="{path: `/users/${tweet.userId}`}">
            <img class="avatar-img" :src="tweet.User.avatar"/>
          </router-link>
        </div>
        <div class="post-content">
          <router-link :to="{path: `/users/${tweet.userId}`}">
            <div class="user-info">
              <div class="user-name">{{ tweet.User.name }}</div>
              <div class="user-accountName">@{{ tweet.User.account }}</div>
              <div class="post-time">‧{{ tweet.createdAt | fromNow }}</div>
            </div>
          </router-link>
          <span class="tweet-content">
            {{ tweet.description }}
          </span>
          <div class="icon-item">
            <button @click="$bus.$emit('replyModal',tweet.id)" class="reply">
              <img class="reply-icon" src="../assets/image/reply-icon.svg" />
              <span class="replay-count">{{ tweet.replyCount }}</span>
            </button>
            <!-- 點擊喜歡icon不會跳轉頁面 -->
            <div class="like-item">
              <button
                class="like"
                v-if="!tweet.isLiked"
                @click.stop.prevent="addLikes(tweet)"
              >
                <img
                  class="like-icon"
                  src="../assets/image/like-icon.svg"
                  alt="/"
                />
                <span>{{ tweet.likeCount }}</span>
              </button>
              <button
                v-else
                class="like"
                type="button"
                @click.stop.prevent="deleteLikes(tweet)"
              >
                <img
                  class="like-icon"
                  src="../assets/image/liked-icon.svg"
                  alt=""
                />
                <span>{{ tweet.likeCount }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userAPI from '../apis/user'
import { fromNowFilter } from "../utils/mixins";
import tweetAPI from './../apis/mainTweet'
export default {
  mixins: [fromNowFilter],
  data() {
    return {
      tweets:[],
      noReply: true,
    }
  },
  created() {
    const { id } = this.$route.params;
    this.fetchTweets(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchTweets(id);
    next();
  },
  methods: {
    async fetchTweets(id) {
      try {
        const { data } = await userAPI.getUserTweetList(id)
        const tweets = data;
        this.tweets = tweets
        if (id === id) {
          this.noReply = false
        } else if(data.status === 'error'){
          this.noReply = true
        }
        // console.log('data',data);
      } catch (error) {
        this.noReply = true
        console.log('error');
      }
    },
    async addLikes(tweet) {
      try {
        const { data } = await tweetAPI.addLike(tweet.id)
        // console.log('data',data)
        tweet.isLiked = !tweet.isLiked
        tweet.likeCount += 1
      } catch (error) {
        console.log('error')
      }
    },
    async deleteLikes(tweet) {
      try {
        const { data } = await tweetAPI.deleteLike(tweet.id)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        tweet.isLiked = !tweet.isLiked
        tweet.likeCount -= 1
      } catch (error) {
        console.log('error2')
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tweet-container {
  @include size(100%, 100%);
  margin-top: 10px;
}
.noReply {
  font-size: 18px;
  margin: 20px;
  color: var(--info);
}
.tweet-list {
  position: relative;
  @include size(100%, 100%);
  display: flex;
  flex-direction: column;
}
.tweet-item {
  @include size(100%, 100%);
  display: flex;
  // align-items: center;
  font-size: 15px;
  font-weight: 700;
  line-height: 15px;
  border-bottom: 1px solid var(--theme-line);
  padding: 10px;
}
.user-avatar {
  @include size(50px, 50px);
  margin: 0 10px auto 15px;
}
.avatar-img {
  background-color: var(--avatar-img-background);
  border-radius: 50%;
  &:hover {
    background-color: darkgray;
  }
}
.post-content {
  @include size(510px, 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // flex-wrap: wrap;
  margin-right: 15px;
  // padding-top: 10px;
}
.user-info {
  display: flex;
}
.user-name {
  color: var(--main-text);
  margin-right: 5px;
  &:hover {
    text-decoration: underline;
  }
}
.user-accountName {
  color: var(--info);
  font-size: 15px;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
}
.post-time {
  color: var(--info);
  font-size: 15px;
  font-weight: 500;
  &:hover {
    text-decoration: none;
  }
}
.tweet-content {
  @include size(100%, 100%);
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  margin: 10px 0;
  word-break: break-all;
}
.icon-item {
  @include size(130px, 21px);
  display: flex;
  justify-content: space-between;
}
.reply,
.like {
  display: flex;
}
.reply-icon,
.like-icon {
  @include size(15px, 15px);
  margin-right: 10px;
}
.replay-count,
.like-count {
  color: var(--info);
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
}
</style>