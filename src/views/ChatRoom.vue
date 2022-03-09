<template>
  <div class="container d-flex">
    <Sidebar />
    <div class="chat-area d-flex">
      <div class="user-list">
        <div class="header">
          <h4 class="title">上線使用者 (5)</h4>
        </div>
        <!-- 使用者清單 -->
        <div class="user d-flex align-items-center">
          <img :src="null | nullAvatar" alt="預設的上線使用者" />
          <h5 class="name">Apple</h5>
          <span>@apple</span>
        </div>
      </div>
      <!-- 右側聊天室 -->
      <div class="chatroom d-flex flex-column">
        <div class="header">
          <h4 class="title">公開聊天室</h4>
          <!-- 錯誤提示 -->
          <transition name="hint" appear>
            <!-- 更改內容需手動校正置中位置 -->
            <div v-if="messageHint" class="pill hint">
              不可以用空白留言洗版呦～～
            </div>
          </transition>
        </div>

        <div class="message-area">
          <!-- 訊息為 status、otherMessage、ownMessage -->
          <div
            v-for="(bubble, index) in messageList"
            :key="index"
            class="message"
          >
            <!-- status pill -->
            <transition name="status" appear>
              <div
                v-if="bubble.type === 'userStatus'"
                :key="index"
                class="pill"
              >
                Esther Howard 上線
              </div>
            </transition>

            <!-- other user bubble -->
            <transition name="avatar" mode="in-out" appear>
              <div
                v-if="bubble.type === 'otherMessage'"
                :key="index"
                class="bubble"
              >
                <div class="d-flex">
                  <img :src="null | nullAvatar" alt="預設的使用者" />
                  <transition name="other" appear>
                    <div class="message">{{ bubble.message }}</div>
                  </transition>
                </div>
                <p>{{ bubble.time | messageTime }}</p>
              </div>
            </transition>

            <!-- own bubble -->
            <transition name="own" appear
              ><div v-if="bubble.type === 'ownMessage'" class="bubble own">
                <div class="message">
                  {{ bubble.message }}
                </div>
                <p>{{ bubble.time | messageTime }}</p>
              </div>
            </transition>
          </div>
        </div>

        <form
          @submit.prevent="sendMessage"
          class="input-field d-flex align-items-center"
        >
          <input v-model="message" type="text" placeholder="輸入訊息..." />
          <button
            type="submit"
            class="send d-flex justify-content-center align-items-center"
          >
            <!-- send -->
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.13 9.35798L1.614 0.107979C1.324 -0.0440207 0.974 0.00597923 0.741 0.233979C0.511 0.459979 0.448001 0.810979 0.591001 1.10198L4.953 10.022L0.591001 18.942C0.448001 19.234 0.511 19.585 0.741 19.81C0.886 19.95 1.074 20.022 1.264 20.022C1.384 20.022 1.504 19.994 1.614 19.935L19.131 10.685C19.376 10.555 19.531 10.299 19.531 10.021C19.531 9.74298 19.376 9.48898 19.131 9.35898L19.13 9.35798ZM2.948 2.50998L15.752 9.27198H6.255L2.948 2.51198V2.50998ZM6.255 10.77H15.753L2.948 17.535L6.255 10.772V10.77Z"
                fill="#FF6600"
              />
            </svg>
            <!-- send -->
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import {
  nullAvatarFilter,
  fromNowFilter,
  messageTimeFilter
} from '../utils/mixins'

export default {
  name: 'chatroom',
  components: { Sidebar },
  mixins: [nullAvatarFilter, fromNowFilter, messageTimeFilter],

  data() {
    return {
      messageList: [],
      message: '',
      messageHint: false
    }
  },

  watch: {
    messageHint() {
      if (this.messageHint === true) {
        setTimeout(() => {
          this.messageHint = false
        }, 3000)
      }
    }
  },

  methods: {
    sendMessage() {
      if (!this.message) {
        this.messageHint = true
        return
      }

      this.messageList.push({
        type: 'ownMessage',
        message: this.message,
        time: new Date()
      })

      this.message = ''

      // this.messageList.push({
      //   type: 'userStatus'
      // })

      // this.messageList.push({
      //   type: 'otherMessage'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-area {
  margin-left: 6px;

  border: 1px solid var(--theme-line);
  flex-grow: 1;

  .user-list {
    flex-shrink: 1;
    min-width: 220px;
    height: 100vh;
    overflow-y: scroll;
  }

  .header {
    z-index: 1;
    position: sticky;
    top: 0%;
    border-bottom: 1px solid var(--theme-line);
    background-color: rgba(#fff, 0.8);
    backdrop-filter: blur(8px);
    padding: 24px;
  }

  h4.title {
    font-size: 24px;
    line-height: 26px;
    font-weight: 700;
    color: var(dark-100);
  }
}

.user {
  padding: 16px 15px 15px;
  border-bottom: 1px solid var(--theme-line);

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  word-break: break-all;
  h5,
  span {
    min-width: 3rem;
  }

  h5.name {
    margin: 0 5px 0 10px;
    color: var(--main-text);
    font-size: 16px;
    line-height: 26px;
    font-weight: 700;
  }

  span {
    color: var(--theme-secondary);
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
  }
}

.chatroom {
  border-left: 1px solid var(--theme-line);

  min-width: 300px;
  max-height: 100vh;
  flex-grow: 1;
  overflow-y: scroll;

  .pill {
    // for 留言區
    border-radius: 50px;
    background-color: var(--pill-background);
    margin: 0 auto 15px;
    padding: 7px 14px;

    width: fit-content;
    word-break: break-word;
    color: var(--info);
    font-size: 15px;
    line-height: 15px;
    font-weight: 500;

    // 標題下方錯誤提示
    &.hint {
      position: absolute;
      top: calc(100% + 29px);
      // 特效採用 translateＹ移動，設定translate校正會導致動畫失效
      // * 需手動減去自身寬度
      left: calc(50% - 225px / 2);

      color: var(--invalid);
      background-color: rgba(#fff, 0.8);
      backdrop-filter: blur(8px);
      border: 1px solid var(--theme-color);
    }
  }

  // 錯誤提示
  .hint-enter-active,
  .hint-leave-active,
  .hint-move {

    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
  }

  .hint-enter,
  .hint-leave-to {
    opacity: 0%;
    transform: translateY(-75%);
  }

}

.message-area {
  flex-grow: 1;
  padding: 16px;

  // 首個訊息
  .message:first-child {
    margin-top: 51px;
  }

  // vue 動畫
  // 其他使用者頭像
  .avatar-enter-active,
  .avatar-leave-active {
    transform-origin: center left;
    transition: opacity 1.35s ease-out,
      transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.285);
  }

  .avatar-enter,
  .avatar-leave-to {
    opacity: 0;
    transform: scale(0%);
  }

  .avatar-enter-to,
  .avatar-leave {
    opacity: 1;
    transform: scale(100%);
  }

  // 使用者狀態、對話泡泡
  .status-enter-active,
  .status-leave-active,
  .status-move,
  .other-enter-active,
  .other-leave-active,
  .own-enter-active,
  .own-leave-active {
    transition: opacity 0.65s ease-out,
      transform 0.65s cubic-bezier(0.8, -0.6, 0.1, 1.4);
  }

  .status-enter-active,
  .status-leave-active {
    transform-origin: 50% 20%;
  }

  .other-enter-active,
  .other-leave-active {
    transform-origin: bottom left;
  }

  .own-enter-active,
  .own-leave-active {
    transform-origin: bottom right;
  }

  .status-enter,
  .status-leave-to,
  .other-enter,
  .other-leave-to,
  .own-enter,
  .own-leave-to {
    opacity: 0;
    transform: scale(0%);
  }

  .status-enter-to,
  .status-leave,
  .other-enter-to,
  .other-leave,
  .own-enter-to,
  .own-leave {
    opacity: 1;
    transform: scale(100%);
  }
}

.bubble {
  --avatar-width: 40px;
  font-weight: 400;
  margin-bottom: 20px;
  // for 其他使用者
  text-align: left;
  img {
    align-self: flex-end;
    width: var(--avatar-width);
    height: var(--avatar-width);
    border-radius: 50%;
  }

  .message {
    word-break: break-word;
    width: fit-content;
    max-width: 60%;
    background-color: var(--theme-line);
    border-radius: 25px 25px 25px 0px;

    padding: 10px 15px 15px;
    color: var(--main-text);
    font-size: 15px;
    line-height: 20px;
  }

  p {
    margin-top: 2px;
    padding-left: var(--avatar-width);

    color: var(--info);
    font-size: 13px;
    line-height: 13px;
  }

  // 自己對話泡泡
  &.own {
    text-align: right;
    position: relative;
    right: 0%;
    .message {
      margin-left: auto;
    }

    .message {
      border-radius: 25px 25px 0px 25px;
      background-color: var(--theme-color);
      color: var(--just-white);
    }
  }
}

form {
  position: sticky;
  bottom: 0%;
  background-color: rgba(#fff, 0.8);
  backdrop-filter: blur(8px);
  padding: 16px;
  border-top: 1px solid var(--theme-line);
  input {
    flex-grow: 1;
    border-radius: 50px;
    border: none;
    box-shadow: 0 0 -1px 0px var(--theme-line);
    background-color: var(--theme-line);
    // opacity: 0.5;
    backdrop-filter: blur(8px);

    margin-right: 16px;
    padding: 3px 16px;
    color: var(--dark-70);
    font-size: 16px;
    line-height: 26px;

    &:focus {
      color: var(--main-text);
      box-shadow: 0 0 3px 0px var(--dark-100);
    }
  }

  button {
    position: relative;
    @include size(24px, 24px);
    &:hover {
      &::before {
        position: absolute;
        z-index: -1;
        content: '';
        top: 50%;
        left: 40%;
        transform: translate(-50%, -50%);
        background-color: var(--theme-line);
        opacity: 80%;
        width: 150%;
        height: 150%;
        border-radius: 50%;
      }

      path {
        fill: var(--hover-color);
      }
    }
    &:focus path {
      fill: var(--focus-color);
    }
  }
}

@media screen and(min-width: $breakpoint) {
  .chat-area {
    margin-left: 24px;

    .chatroom {
      min-width: 450px;
    }
  }

  .user-list {
    width: 415px;
  }
}
</style>
