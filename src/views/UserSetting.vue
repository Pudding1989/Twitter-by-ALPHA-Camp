<template>
  <div class="setting-container">
    <Sidebar />
    <form class="setting-form" @submit="handleSubmit">
      <div class="form-header">
        <h2 class="title">帳戶設定</h2>
      </div>

      <div class="form-area">
        <div
          class="form-row d-flex flex-column"
          :class="{
            invalid: accountHint,
            'is-loading': isLoading,
            'is-processing': isProcessing
          }"
        >
          <label for="account">帳號</label>

          <div class="d-flex">
            <span>@</span>
            <input
              v-model.trim="account"
              id="account"
              type="text"
              :disabled="isLoading || isProcessing"
            />
          </div>

          <transition name="hint">
            <p v-if="accountHint" id="account" class="error-hint">
              {{
                accountHint === 'empty'
                  ? '帳號不能空白，請填入想更改的帳號'
                  : 'Account 已經有人使用'
              }}
            </p>
          </transition>
        </div>

        <div
          class="form-row d-flex flex-column"
          :class="{
            invalid: nameHint,
            'is-loading': isLoading,
            'is-processing': isProcessing
          }"
        >
          <label for="name">名稱</label>
          <input
            v-model.trim="name"
            type="text"
            id="name"
            :disabled="isLoading || isProcessing"
          />

          <transition name="hint">
            <p v-if="nameHint" class="error-hint">字數超出上限！</p>
          </transition>

          <transition name="hint">
            <p v-if="nameCount">{{ nameCount }}/50</p>
          </transition>
        </div>

        <div
          class="form-row d-flex flex-column"
          :class="{
            invalid: emailHint,
            'is-loading': isLoading,
            'is-processing': isProcessing
          }"
        >
          <label for="email">Email</label>
          <input
            v-model.trim="email"
            class="email"
            type="email"
            id="email"
            :disabled="isLoading || isProcessing"
          />
          <transition name="hint">
            <p v-if="emailHint" class="error-hint">
              {{
                emailHint === 'empty'
                  ? 'Email不能空白，請填入想更改的 Email'
                  : 'Email 已經有人使用'
              }}
            </p>
          </transition>

          <transition name="hint">
            <div v-if="emailCheck" class="hint d-flex align-items-center">
              <!-- check SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <!-- check SVG -->
              &thinsp;輸入的Email 符合格式
            </div>
          </transition>
        </div>

        <div
          class="form-row d-flex flex-column"
          :class="{
            invalid: passwordHint,
            'is-loading': isLoading,
            'is-processing': isProcessing
          }"
        >
          <label for="password">密碼</label>
          <input
            v-model.trim="password"
            @blur="passwordLength"
            type="password"
            id="password"
            :disabled="isLoading || isProcessing"
          />
          <transition name="hint">
            <p v-if="passwordHint" class="error-hint">密碼至少要有４個字</p>
          </transition>
        </div>

        <div
          class="form-row d-flex flex-column"
          :class="{
            invalid: checkHint,
            'is-loading': isLoading,
            'is-processing': isProcessing
          }"
        >
          <label for="passwordCheck">密碼確認</label>
          <input
            v-model.trim="passwordCheck"
            @blur="checkPassword"
            type="password"
            id="passwordCheck"
            :disabled="isLoading || isProcessing"
          />
          <transition name="hint">
            <p v-if="checkHint" class="error-hint">密碼確認錯誤！</p>
          </transition>
        </div>

        <div class="footer">
          <transition name="fade">
            <button
              v-if="modify"
              @click="restore"
              type="button"
              class="restore"
              :disabled="isProcessing"
            >
              <!-- time past SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path
                  d="M12,0A11.972,11.972,0,0,0,4,3.073V1A1,1,0,0,0,2,1V4A3,3,0,0,0,5,7H8A1,1,0,0,0,8,5H5a.854.854,0,0,1-.1-.021A9.987,9.987,0,1,1,2,12a1,1,0,0,0-2,0A12,12,0,1,0,12,0Z"
                />
                <path
                  d="M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z"
                />
              </svg>
              <!-- time past SVG -->
              回復設定
            </button>
          </transition>

          <button
            type="submit"
            @mouseenter="saveHint"
            class="save"
            :disabled="isProcessing"
          >
            <Spinner v-if="isProcessing" />
            {{ isProcessing ? '儲存中..' : '儲存' }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Spinner from '../components/Spinner.vue'

import userAPI from '../apis/user'

export default {
  components: {
    Sidebar,
    Spinner
  },

  data() {
    return {
      isLoading: true,
      account: '',
      accountHint: false,
      name: '',
      nameHint: false,
      email: '',
      emailInit: '',
      emailHint: false,
      emailCheck: false,
      password: '',
      passwordHint: false,
      passwordCheck: '',
      checkHint: false,
      modify: false,
      isProcessing: false
    }
  },

  computed: {
    nameCount() {
      this.name.length > 50 ? (this.nameHint = true) : (this.nameHint = false)
      return this.name.length
    }
  },

  watch: {
    account(newInput) {
      newInput ? (this.accountHint = false) : (this.accountHint = 'empty')

      newInput !== this.$store.state.currentUser.account
        ? (this.modify = true)
        : (this.modify = false)
    },

    name(newInput) {
      newInput !== this.$store.state.currentUser.name
        ? (this.modify = true)
        : (this.modify = false)
    },

    email(newInput) {
      newInput ? (this.emailHint = false) : (this.emailHint = 'empty')

      newInput.match(/[^@\s]+@[^@\s]+\.[^@\s]+/)
        ? (this.emailCheck = true)
        : (this.emailCheck = false)

      newInput !== this.emailInit ? (this.modify = true) : (this.modify = false)
    },

    password(newInput, oldInput) {
      newInput !== oldInput && (this.passwordHint = false)
    },

    passwordCheck(newInput, oldInput) {
      newInput !== oldInput && (this.checkHint = false)
    }
  },

  created() {
    this.fetchAccount()
  },

  methods: {
    passwordLength() {
      this.password && this.password.length < 4
        ? (this.passwordHint = true)
        : (this.passwordHint = false)
    },

    checkPassword() {
      this.passwordCheck && this.password !== this.passwordCheck
        ? (this.checkHint = true)
        : (this.checkHint = false)
    },

    async fetchAccount() {
      this.isLoading = true
      try {
        const { data } = await userAPI.getCurrent()

        if (data.status !== 'success') {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '無法取得資料'
          })
        }

        const { account, name, email } = data.data
        this.account = account
        this.name = name
        this.email = email
        this.emailInit = email
      } catch (error) {
        console.log(error)
        this.$bus.$emit({ title: `${error}` })
      } finally {
        this.isLoading = false
      }
    },

    async handleSubmit() {
      // 前端驗證
      if (!this.modify && !this.password) {
        this.$bus.$emit('toast', {
          icon: 'error',
          title: '你沒有修改任何帳戶資料喔'
        })

        return
      }

      if (!this.account) {
        this.$bus.$emit('toast', {
          icon: 'error',
          title: '請填入想更改的帳號'
        })

        return
      }

      if (this.name.length > 50) {
        this.$bus.$emit('toast', { icon: 'error', title: '字數超出上限！' })
      }

      if (!this.email) {
        this.$bus.$emit('toast', { icon: 'error', title: '請填入 Email' })

        return
      } else if (!/[^@\s]+@[^@\s]+\.[^@\s]+/.test(this.email)) {
        this.$bus.$emit('toast', { icon: 'error', title: 'Email 格式錯誤' })
        return
      }

      if (this.password && this.password.length < 4) {
        this.$bus.$emit('toast', {
          icon: 'error',
          title: '密碼至少要有四個字'
        })

        return
      }
      // 密碼確認欄位
      if (this.password && !this.passwordCheck) {
        this.$bus.$emit('toast', {
          icon: 'error',
          title: '請再次輸入密碼'
        })

        return
      } else if (this.password !== this.passwordCheck) {
        this.$bus.$emit('toast', {
          icon: 'error',
          title: '密碼與密碼確認輸入內容不同'
        })

        return
      }

      this.isProcessing = true
      try {
        const { data } = await userAPI.editAccount({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.fetchAccount()
        this.$store.dispatch('fetchCurrentUser')

        this.$bus.$emit('toast', {
          icon: 'success',
          title: '資料修改成功'
        })

        this.modify = false
      } catch (error) {
        console.log(error)

        // 後端驗證
        if (
          error.message.match(/account/i) &&
          error.message.match(/required/i)
        ) {
          // 帳號
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '帳號不能空白'
          })

          this.accountHint = 'empty'

        } else if (error.message.match(/暱稱/) && error.message.match(/上限/)) {
          // 名稱
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '名稱字數超過上限'
          })

          this.nameHint = true
        }else if (error.message.match(/email/i) && error.message.match(/required/i)) {
          // email
          this.$bus.$emit('toast', {
            icon: 'error',
            title: 'Email 不能空白'
          })

          this.emailHint = 'empty'
        }else if (error.message.match(/密碼至少/)) {
          // 密碼
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '密碼至少要有四個字'
          })

          this.passwordHint = true
        } else {
          // 其他錯誤訊息
          this.$bus.$emit('toast', {
            icon: 'error',
            title: `${error.message}`
          })
        }
      } finally {
        this.isProcessing = false
      }
    },

    restore() {
      this.isLoading = true

      this.account = this.$store.state.currentUser.account
      this.name = this.$store.state.currentUser.name
      this.email = this.emailInit
      this.password = ''
      this.passwordCheck = ''

      this.isLoading = false
    },

    saveHint() {
      if (this.modify) {
        this.$bus.$emit('toast', {
          icon: 'success',
          title: '尚未儲存前，都可以回復原本帳戶資料'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/formCommon.scss';

.setting-container {
  display: flex;
}

.setting-form {
  flex-grow: 1;
  // for mobile layout
  margin-left: 12px;

  border-left: 1px solid var(--theme-line);
}

.form-header {
  border-bottom: 1px solid var(--theme-line);
  padding: 13px 20px;

  h2.title {
    color: var(--main-text);
    font-size: 19px;
    line-height: 28px;

    font-weight: 700;
  }
}

.form-area {
  min-width: 460px;
  // for mobile layout
  padding: 30px 5% 0;
}

.footer {
  text-align: end;

  button {
    // for mobile layout
    padding: 10px 20px;

    // for mobile layout
    --font-size: 16px;
    line-height: 24px;
  }

  button:nth-last-child(n + 2) {
    margin-right: 1em;
  }

  button.save {
    .spinner {
      position: relative;

      margin-right: 0.25em;

      --spinner-size: inherit;
      --spinner-color: var(--just-white);
    }
  }

  button.restore {
    svg {
      margin-right: 0.1em;
      transform: translateY(15%);
    }

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.35s ease-out;
    }

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }
  }
}

.form-row {
  // 帳號欄
  &:nth-child(1) {
    span {
      color: var(--main-text);
    }
  }

  &:nth-last-child(2) {
    margin-bottom: 40px;
  }
}

@media screen and (min-width: $breakpoint) {
  .setting-form {
    margin-left: 65px;
  }

  .form-area {
    max-width: 642px;
    padding: 30px 16px 0;
  }

  .footer {
    button {
      padding: 10px 40px;

      --font-size: 18px;
      line-height: 26px;
    }
  }
}
</style>
