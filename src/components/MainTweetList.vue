<template>
  <div class="tweet-list" :class="{ loading: isLoading }">
    <!-- tweet skeleton -->
    <template v-if="isLoading">
      <div class="tweet-item" v-for="skeleton in 6" :key="skeleton">
        <div class="user-avatar">
          <SkeletonScreen :isLoading="isLoading" :skeleton="'div'">
            <template #skeletonLength></template>
          </SkeletonScreen>
        </div>

        <div class="post-content d-flex flex-column">
          <div class="user-info">
            <div class="user-name">
              <SkeletonScreen :isLoading="isLoading" :skeleton="'span'">
                <template #skeletonLength
                  >&emsp;&emsp;&emsp;&emsp;&emsp;</template
                >
              </SkeletonScreen>
            </div>
            <div class="user-accountName">
              <SkeletonScreen :isLoading="isLoading" :skeleton="'span'">
                <template #skeletonLength>&emsp;&emsp;&emsp;</template>
              </SkeletonScreen>
            </div>

            <div class="post-time">
              ‧<SkeletonScreen :isLoading="isLoading" :skeleton="'span'">
                <template #skeletonLength>&emsp;&emsp;</template>
              </SkeletonScreen>
            </div>
          </div>
          <span to="" class="tweet-content">
            <span class="tweet-content">
              <SkeletonScreen :isLoading="isLoading" :skeleton="'div'">
                <template #skeletonLength>&emsp;<br />&emsp;</template>
              </SkeletonScreen>
            </span>
          </span>

          <div class="icon-item">
            <span class="reply d-flex">
              <SkeletonScreen :isLoading="isLoading" :skeleton="'span'">
                <template #skeletonLength>&emsp;&emsp;</template>
              </SkeletonScreen>

              <span class="replay-count"
                ><SkeletonScreen :isLoading="isLoading" :skeleton="'span'">
                  <template #skeletonLength>&emsp;</template>
                </SkeletonScreen></span
              >
            </span>

            <div class="like-item">
              <span class="like d-flex">
                <SkeletonScreen :isLoading="isLoading" :skeleton="'span'">
                  <template #skeletonLength>&emsp;&emsp;</template>
                </SkeletonScreen>

                <span class="like-count">
                  <SkeletonScreen :isLoading="isLoading" :skeleton="'span'">
                    <template #skeletonLength>&emsp;</template>
                  </SkeletonScreen>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 下方推文列表 -->
    <transition-group v-show="!isLoading" name="tweet">
      <div class="tweet-item" v-for="tweet in tweets" :key="tweet.id">
        <!-- 點擊照片會跳轉頁面到其他使用者個人資料 -->
        <div class="user-avatar">
          <router-link :to="{ path: `/users/${tweet.userId}` }">
            <img :src="tweet.User.avatar | nullAvatar" alt="/" />
          </router-link>
        </div>

        <!-- 點擊名稱和帳號會跳轉頁面到其他使用者個人資料 -->
        <div class="post-content d-flex flex-column">
          <router-link :to="{ path: `/users/${tweet.userId}` }">
            <div class="user-info">
              <div class="user-name">{{ tweet.User.name }}</div>
              <div class="user-accountName">{{ tweet.User.account }}</div>
              <div class="post-time">‧{{ tweet.createdAt | fromNow }}</div>
            </div>
          </router-link>
          <!-- 點擊貼文內容會跳轉頁面到推文頁面 -->
          <router-link
            :to="{ path: `/tweets/${tweet.id}` }"
            class="tweet-content"
          >
            <span class="tweet-content">
              {{ tweet.description }}
            </span>
          </router-link>

          <div class="icon-item">
            <button
              @click="$bus.$emit('replyModal', tweet.id)"
              class="reply d-flex"
            >
              <!-- SVG -->
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.77881 1.40127L6.18631 1.39502H6.18506C3.45131 1.39502 1.31006 3.53689 1.31006 6.27127C1.31006 8.83252 3.30131 10.775 5.97568 10.8775V13.27C5.97568 13.3375 6.00318 13.4488 6.05068 13.5219C6.13943 13.6625 6.29068 13.7388 6.44568 13.7388C6.53193 13.7388 6.61881 13.715 6.69693 13.665C6.86193 13.56 10.7426 11.0775 11.7519 10.2238C12.9407 9.21752 13.6519 7.74252 13.6538 6.27877V6.26814C13.6501 3.53877 11.5101 1.40127 8.77881 1.40064V1.40127ZM11.1457 9.50877C10.4369 10.1088 8.10693 11.6369 6.91318 12.4106V10.4188C6.91318 10.16 6.70381 9.95002 6.44443 9.95002H6.19693C3.90943 9.95002 2.24818 8.40252 2.24818 6.27127C2.24818 4.06252 3.97818 2.33252 6.18568 2.33252L8.77756 2.33877H8.77881C10.9863 2.33877 12.7163 4.06752 12.7176 6.27377C12.7157 7.46752 12.1288 8.67627 11.1463 9.50877H11.1457Z"
                  fill="#657786"
                />
              </svg>
              <!-- SVG -->
              <span class="replay-count">{{ tweet.replyCount }}</span>
            </button>

            <!-- 點擊喜歡icon不會跳轉頁面 -->
            <div class="like-item">
              <button
                class="like d-flex"
                @click.stop.prevent="toggleLike(tweet)"
                :disabled="tweet.isProcessing"
              >
                <!-- like SVG -->
                <svg
                  v-show="!tweet.isLiked"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 13.5236H7.49125C5.87687 13.4936 1.21875 9.28489 1.21875 5.29864C1.21875 3.38364 2.79687 1.70239 4.59562 1.70239C6.02687 1.70239 6.98937 2.68989 7.49937 3.40864C8.00812 2.69114 8.97062 1.70239 10.4025 1.70239C12.2025 1.70239 13.78 3.38364 13.78 5.29927C13.78 9.28427 9.12125 13.493 7.50687 13.5224H7.5V13.5236ZM4.59625 2.64052C3.29625 2.64052 2.15687 3.88302 2.15687 5.29989C2.15687 8.88739 6.55312 12.5474 7.50062 12.5861C8.44937 12.5474 12.8444 8.88802 12.8444 5.29989C12.8444 3.88302 11.705 2.64052 10.405 2.64052C8.825 2.64052 7.9425 4.47552 7.935 4.49364C7.79125 4.84489 7.2125 4.84489 7.06812 4.49364C7.05937 4.47489 6.1775 2.64052 4.59687 2.64052H4.59625Z"
                    fill="#657786"
                  />
                </svg>
                <!-- like SVG -->

                <transition name="heartbeat">
                  <!-- liked SVG -->
                  <svg
                    v-show="tweet.isLiked"
                    :key="'heartbeat'"
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 19.6381H10.986C8.40295 19.5901 0.949951 12.8561 0.949951 6.47812C0.949951 3.41412 3.47495 0.724121 6.35295 0.724121C8.64295 0.724121 10.183 2.30412 10.999 3.45412C11.813 2.30612 13.353 0.724121 15.644 0.724121C18.524 0.724121 21.048 3.41412 21.048 6.47912C21.048 12.8551 13.594 19.5891 11.011 19.6361H11V19.6381Z"
                      fill="#E0245E"
                    />
                  </svg>
                </transition>
                <!-- liked SVG -->

                <transition name="fall">
                  <span
                    v-show="!tweet.isLiked"
                    :key="'fall'"
                    class="like-count"
                    >{{ tweet.likeCount }}</span
                  >
                </transition>
                <transition name="rise">
                  <span
                    v-show="tweet.isLiked"
                    :key="'rise'"
                    class="like-count"
                    >{{ tweet.likeCount }}</span
                  >
                </transition>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition-group>

    <Spinner v-if="isLoading" />
  </div>
</template>

<script>
import tweetAPI from './../apis/mainTweet'
import { fromNowFilter, nullAvatarFilter } from './../utils/mixins'
import Spinner from '../components/Spinner.vue'
import SkeletonScreen from '../components/slot/SkeletonScreen.vue'

export default {
  components: { Spinner, SkeletonScreen },
  mixins: [fromNowFilter, nullAvatarFilter],
  data() {
    return {
      isLoading: true,
      tweets: []
    }
  },

  created() {
    this.fetchTweets()
  },

  methods: {
    async fetchTweets() {
      this.isLoading = true
      try {
        const { data } = await tweetAPI.getTweets()

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = data.map((tweet) => ({
          ...tweet,
          isProcessing: false
        }))

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
        this.$bus.$emit('toast', { icon: 'error', title: `${error}` })
      }
    },

    async toggleLike(tweet) {
      tweet.isProcessing = true

      try {
        if (!tweet.isLiked) {
          const { data } = await tweetAPI.addLike(tweet.id)

          if (data.status !== 'success') {
            throw new Error(data.message)
          }

          tweet.isLiked = !tweet.isLiked
          tweet.likeCount += 1
          tweet.isProcessing = false
        } else {
          const { data } = await tweetAPI.deleteLike(tweet.id)

          if (data.status !== 'success') {
            throw new Error(data.message)
          }

          tweet.isLiked = !tweet.isLiked
          tweet.likeCount -= 1
          tweet.isProcessing = false
        }
      } catch (error) {
        tweet.isProcessing = false

        console.log(error)
        this.fetchTweets()
        this.$bus.$emit('toast', { icon: 'error', title: `${error}` })
      }
    }
  },

  beforeMount() {
    this.$bus.$on('fetch-MainTweetList', () => {
      this.fetchTweets()
    })
  }
}
</script>

<style lang="scss" scoped>
.tweet-list {
  max-height: 80vh;
  overflow-y: scroll;

  &.loading {
    padding: 10px 0;
    position: relative;
  }
}

.tweet-item {
  display: flex;
  font-size: 15px;
  font-weight: 700;
  line-height: 15px;
  border-bottom: 1px solid var(--theme-line);

  padding: 10px 15px 14px;

  // Vue transition
  &.tweet-enter-active,
  &.tweet-leave-active {
    transform-origin: top center;
    transition: opacity 0.65s ease-in-out,
      transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.285);
  }

  &.tweet-enter {
    opacity: 0;
    transform: scaleY(0%);
  }

  &.tweet-leave-to {
    opacity: 0;
  }
}

.user-avatar {
  flex-shrink: 0;
  margin-right: 10px;

  @include size(50px, 50px);
  border-radius: 50%;
  overflow: hidden;

  img {
    background-color: var(--avatar-img-background);
  }
}

.post-content {
  flex-grow: 1;
}

.user-info {
  display: flex;
}

.user-name {
  color: var(--main-text);
  margin-right: 5px;
}

.user-accountName {
  color: var(--info);
  font-size: 15px;
  font-weight: 500;
}

.post-time {
  color: var(--info);
  font-size: 15px;
  font-weight: 500;
}

.tweet-content {
  margin: 6px 0 14px;

  font-size: 15px;
  font-weight: 500;
  line-height: 22px;

  word-break: break-all;

  &:hover {
    color: var(--placeholder);
  }
}

.icon-item {
  display: flex;
  align-items: center;

  .like,
  .reply {
    align-items: center;

    svg,
    // for skeleton screen
    span:first-child {
      @include size(15px, 15px);
      margin-right: 10px;
    }

    &:hover {
      span {
        color: var(--hover-color);
      }

      path {
        fill: var(--hover-color);
      }
    }
  }

  // for skeleton screen
  & > *:first-child {
    margin-right: 50px;
  }

  button.like {
    &:hover {
      span {
        color: var(--like-icon);
      }

      path {
        fill: var(--like-icon);
      }
    }

    svg {
      &.heartbeat-enter-active {
        transition: opacity 0.25s ease-out;
        animation: heartbeat 0.65s linear;
      }
    }

    span {
      &.rise-enter-active {
        color: var(--like-icon);
        transition: opacity 0.5s ease-out,
          transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.285);
      }

      &.rise-enter {
        opacity: 0.1;
        transform: translateY(100%);
      }

      &.fall-enter-active {
        transition: opacity 0.45s ease-out,
          transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.285);
      }

      &.fall-enter {
        opacity: 0.1;
        transform: translateY(-75%);
      }
    }
  }

  @keyframes heartbeat {
    0% {
      transform: scale(0);
    }
    30% {
      transform: scale(1.4);
    }
    40% {
      transform: scale(0.8);
    }
    60% {
      transform: scale(1.2);
    }
    85% {
      transform: scale(0.85);
    }
    100% {
      transform: scale(1);
    }
  }
}

.replay-count,
.like-count {
  color: var(--info);
  font-size: 13px;
  font-weight: 500;
  line-height: 13px;
}
</style>
