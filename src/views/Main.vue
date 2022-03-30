<template>
  <div class="container d-flex">
    <Sidebar />
    <div class="main">
      <!-- title -->
      <div class="main-header">
        <span class="title">首頁</span>
      </div>
      <!-- 推文區域 -->
      <div class="tweet-area">
        <div class="user-avatar">
          <router-link to="/profile">
            <img
              class="avatar"
              :src="currentUser.avatar | nullAvatar"
              alt="預設的頭像"
            />
          </router-link>
        </div>
        <!-- 推文輸入框 -->
        <div class="text-area d-flex flex-column">
          <textarea
            v-model="tweet"
            type="text"
            placeholder="有什麼新鮮事？"
            autofocus
          />
          <div class="statusbar d-flex align-items-center">
            <transition name="hint"
              ><span v-if="tweetHint" class="hint">{{
                tweetHint === 'empty' ? '內容不可空白' : '字數不可超過 140 字'
              }}</span>
            </transition>
            <button
              @click.stop.prevent="submitTweet"
              :disabled="isProcessing"
              class="tweet-btn"
              type="button"
            >
              {{ isProcessing ? '推文中..' : '推文' }}
            </button>
          </div>
        </div>
      </div>

      <MainTweetList />
    </div>
    <RightColumn />
    <ReplyModal />
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import RightColumn from '../components/RightColumn.vue'
import MainTweetList from '../components/MainTweetList.vue'
import { mapState } from 'vuex'
import { nullAvatarFilter } from './../utils/mixins'
import tweetAPI from '../apis/tweet'
import ReplyModal from '../components/ReplyModal.vue'

export default {
  mixins: [nullAvatarFilter],
  data() {
    return {
      tweet: '',
      isProcessing: false,
      tweetHint: false
    }
  },
  components: {
    Sidebar,
    RightColumn,
    MainTweetList,
    ReplyModal
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async submitTweet() {
      try {
        if (!this.tweet) {
          this.tweetHint = 'empty'
          this.$bus.$emit('toast', { icon: 'error', title: '內容不可空白' })
          return
        }
        if (this.tweet.length >= 140) {
          this.tweetHint = true
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '字數不可超過 140 字'
          })
          return
        }
        this.isProcessing = true
        const { data } = await tweetAPI.submitTweet({ description: this.tweet })
        console.log(data)
        if (data.status === 'success') {
          this.tweet = ''
          this.$bus.$emit('fetch-MainTweetList', true)
          this.$bus.$emit('toast', {
            icon: 'success',
            title: '推文發送成功'
          })
          this.isProcessing = false
        } else {
          throw new Error(data.message)
        }
      } catch (error) {
        console.log(error)
        this.isProcessing = false
        this.$bus.$emit('toast', {
          icon: 'error',
          title: `${error}`
        })
      }
    }
  },

  watch: {
    tweet(nowState) {
      nowState.length >= 140
        ? (this.tweetHint = true)
        : (this.tweetHint = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  @include size(100%, 100%);
  max-width: 600px;
  min-width: 576px;
  margin: 0 30px;

  background-color: var(--theme-line);
  & > * {
    background-color: var(--just-white);
  }
}

.main-header {
  @include size(100%, 55px);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--theme-line);
}

.title {
  margin-left: 15px;
  color: var(--main-text);
  font-size: 18px;
  font-weight: 700;
  line-height: 26.06px;
}

.tweet-area {
  display: flex;
  height: 120px;
  margin-bottom: 10px;
  padding: 10px 15px 10px 15px;
}

.user-avatar {
  margin-right: 10px;
}

.avatar {
  @include size(50px, 50px);
  border-radius: 50%;
}

.text-area {
  flex-grow: 1;

  textarea {
    flex-grow: 1;

    resize: none;
    border: none;
    padding-top: 10px;

    font-weight: 500;
    font-size: 18px;
    line-height: 26px;

    transition: color 0.35s ease-out;
    color: var(--placeholder);
    &:focus {
      color: var(--main-text);
    }
  }
}

.statusbar {
  align-self: flex-end;
  span {
    margin-right: 20px;

    font-weight: 500;
    font-size: 15px;
    line-height: 15px;

    color: var(--invalid);

    // Vue transition
    &.hint-enter-active,
    &.hint-leave-active,
    &.hint-move {
      transition: opacity 0.35s ease-out, transform 0.35s ease-out;
    }

    &.hint-enter {
      opacity: 0.1;
      transform: translateY(-50%);
    }

    &.hint-leave-to {
      opacity: 0.1;
      transform: translateY(-50%);
    }
  }
}

.tweet-btn {
  padding: 10px 15px;

  font-weight: 500;
  font-size: 18px;
  line-height: 18px;

  background-color: var(--theme-color);
  color: var(--just-white);
  border-radius: 100px;

  &:hover {
    color: var(--theme-white);
    background-color: var(--hover-color);
  }

  &:disabled {
    background-color: var(--focus-color);
  }
}
</style>
