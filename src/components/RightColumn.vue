<template>
  <div class="column-container">
    <div class="column-header">
      <span class="column-title"> Popular </span>
    </div>
    <div class="column-list">
      <template v-if="isLoading">
        <div
          class="list-item d-flex justify-content-between align-items-center"
          v-for="skeleton in 10"
          :key="skeleton"
        >
          <div class="user-info">
            <SkeletonScreen
              :isLoading="isLoading"
              :skeleton="'div'"
              :skeletonLength="0"
              class="user-avatar"
            >
            </SkeletonScreen>

            <span>
              <SkeletonScreen
                :isLoading="isLoading"
                :skeleton="'div'"
                :skeletonLength="10"
                class="user-name"
              >
              </SkeletonScreen>
              <SkeletonScreen
                :isLoading="isLoading"
                :skeleton="'div'"
                :skeletonLength="10"
                class="user-accountName"
              >
                >
              </SkeletonScreen>
            </span>
          </div>
          <button class="follow" disabled>載入..</button>
        </div>
      </template>

      <transition name="fade">
        <transition-group
          v-if="!isLoading"
          name="sort"
          tag="div"
          class="items-container"
        >
          <div
            class="list-item d-flex justify-content-between align-items-center"
            v-for="user in users"
            :key="user.id"
          >
            <div class="user-info">
              <div class="user-avatar">
                <router-link :to="{ path: `/users/${user.id}` }">
                  <img class="avatar-img" :src="user.avatar" />
                </router-link>
              </div>
              <router-link :to="{ path: `/users/${user.id}` }">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-accountName">@{{ user.account }}</div>
              </router-link>
            </div>

            <!-- follow button -->
            <button
              v-if="!user.isSelf"
              @click="toggleFollow(user)"
              class="follow"
              :class="{ active: user.isFollowed }"
              :disabled="isLoading || user.isProcessing"
            >
              {{
                user.isProcessing
                  ? '跟隨中..'
                  : user.isFollowed
                  ? '正在跟隨'
                  : '跟隨'
              }}
            </button>
          </div>
        </transition-group>
      </transition>
    </div>
  </div>
</template>

<script>
import userAPI from '../apis/user'
import followAPI from '../apis/follow'
import { mapState } from 'vuex'
import SkeletonScreen from '../components/slot/SkeletonScreen'

export default {
  components: {
    SkeletonScreen
  },
  data() {
    return {
      isLoading: true,
      users: []
    }
  },

  computed: {
    ...mapState(['currentUser'])
  },

  created() {
    this.fetchUser()
  },

  mounted() {
    this.$bus.$on('toggleFollow', () => {
      this.fetchUser()
    })
  },

  methods: {
    async fetchUser() {
      try {
        const { data } = await userAPI.getUsersTop()
        this.users = data

        // 過濾本人
        this.users = this.users.map((user) => {
          if (user.id === this.currentUser.id) {
            return {
              ...user,
              isSelf: true
            }
          } else {
            return { ...user, isProcessing: false }
          }
        })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log(error)
      }
    },

    async toggleFollow(user) {
      user.isProcessing = true

      try {
        if (!user.isFollowed) {
          const { data } = await followAPI.addFollow(user.id)

          if (data.status === 'success') {
            user.isFollowed = true
            user.isProcessing = false
            this.$bus.$emit('toast', { icon: 'success', title: '追隨成功' })

            this.fetchUser()
          }
        } else {
          const { data } = await followAPI.deleteFollow(user.id)

          if (data.status === 'success') {
            user.isFollowed = false
            user.isProcessing = false
            this.$bus.$emit('toast', { icon: 'success', title: '取消追隨成功' })

            this.fetchUser()
          }
        }

        // 傳送給 Profile Area
        this.$bus.$emit('toggleFollow', {
          id: user.id,
          isFollowed: user.isFollowed
        })
      } catch (error) {
        console.log(error)
        this.isProcessing = false
        this.$bus.$emit('toast', { icon: 'error', title: `${error}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.column-container {
  @include size(350px, 756px);
  margin-top: 15px;
  border-radius: 14px;
  background-color: var(--column-background-color);

  .skeleton,
  .skeleton-mask {
    &:hover {
      text-decoration: none;
    }
  }

  .items-container {
    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.35s ease-out,;
    }

    &.fade-enter {
      opacity: 0;
    }
  }
}
.column-header {
  @include size(350px, 45px);
  padding: 10px 15px;
}
.column-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 26.06px;
}
.list-item {
  position: relative;
  @include size(100%, 70px);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--theme-line);

  &.sort-enter-active,
  &.sort-leave-active {
    transform-origin: 75% 50%;
    transition: opacity 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.285),
      transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.285);
  }

  &.sort-enter {
    opacity: 0;
    transform: translateX(-25%);
  }

  &.sort-leave-to {
    opacity: 0;
    transform: translateX(50%) scale(0%);
  }

  &.sort-move {
    z-index: 1;
    background-color: var(--just-white);
    opacity: 0.45;
    transition: all 0.75s cubic-bezier(0.8, -0.6, 0.1, 1.4);

    // css scan shadow #1
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
}
.user-info {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 700;
  line-height: 15px;
}
.user-avatar {
  @include size(50px, 50px);
  margin-right: 10px;

  border-radius: 50%;
  overflow: hidden;
}
.avatar-img {
  background-color: var(--avatar-img-background);
  &:hover {
    background-color: darkgray;
  }
}
.user-name {
  color: var(--main-text);
  &:hover {
    text-decoration: underline;
  }
}
.user-accountName {
  color: var(--info);
  margin-top: 3px;
  &:hover {
    text-decoration: underline;
  }
}

button.follow {
  border-radius: 100px;
  font-size: 15px;
  line-height: 15px;
  font-weight: 700;

  --btn-x-padding: 15px;
  --btn-border-width: 1px;
  padding: 10px 0px;

  transition: width 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.285),
    color 0.35s ease-in, background-color 0.35s ease-in,
    border-color 0.35s ease-out;

  width: calc(2em + var(--btn-x-padding) * 2 + var(--btn-border-width) * 2);

  color: var(--theme-color);
  border: 1px solid var(--theme-color);

  //處理中狀態
  &:disabled {
    width: calc(
      3.25em + var(--btn-x-padding) * 2 + var(--btn-border-width) * 2
    );

    border-color: var(--focus-color);
    color: var(--just-white);
    background-color: var(--focus-color);
  }

  // 正在追蹤狀態
  &.active {
    width: calc(4em + var(--btn-x-padding) * 2 + var(--btn-border-width) * 2);

    color: var(--just-white);
    background-color: var(--theme-color);
  }

  &:hover {
    color: var(--just-white);
    background-color: var(--hover-color);
  }
}
</style>
