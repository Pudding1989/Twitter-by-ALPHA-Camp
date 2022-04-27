<template>
  <form
    class="form-area d-flex flex-column align-items-center"
    @submit.prevent.stop="handleSubmit"
  >
    <!-- logo SVG -->
    <svg
      class="logo"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M30.6996 23.4709C30.6996 23.4709 23.2328 35.5781 17.1109 35.5781C6.40314 35.5781 16.3821 12.5132 24.1916 12.5132C29.641 12.5132 30.6996 23.4709 30.6996 23.4709Z"
        fill="#FF6600"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M39.5723 38.6972C37.4451 40.9607 34.8198 42.6976 31.9044 43.7701C28.989 44.8426 25.8639 45.2213 22.7767 44.8761C19.6895 44.5309 16.7252 43.4713 14.1188 41.7813C11.5125 40.0914 9.33573 37.8175 7.76123 35.1401C9.5314 37.5477 12.5338 39.1527 16.803 39.1527C27.3199 39.1527 33.2899 30.98 33.2899 30.98C33.2899 30.98 33.8062 37.4392 39.5593 38.6972H39.5723Z"
        fill="#FF6600"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M42.7223 15.7451C44.2963 18.7527 45.0781 22.1116 44.9939 25.505C44.9096 28.8984 43.9621 32.2144 42.2407 35.1401C40.8792 34.3764 39.8725 33.1082 39.4379 31.609L37.1558 24.7724L42.7223 15.7451Z"
        fill="#FF6600"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.0031 5.01737C30.0185 5.01403 34.8513 6.89881 38.5398 10.2967L34.7521 16.4088C33.3811 12.843 30.5957 9.2729 25.1767 9.2729C14.0784 9.2729 5.85231 21.3888 5.85231 28.9846C5.84986 29.9669 5.97528 30.9454 6.22543 31.8953C5.11558 28.8725 4.75205 25.6265 5.16572 22.4331C5.57938 19.2398 6.75802 16.1934 8.60147 13.5531C10.4449 10.9127 12.8987 8.75634 15.7542 7.26726C18.6097 5.77818 21.7826 5.00039 25.0031 5V5.01737Z"
        fill="#FF6600"
      />
    </svg>
    <!-- logo SVG -->

    <h1 class="title">建立你的帳號</h1>

    <div
      class="form-row d-flex flex-column"
    >
      <label for="account"> 帳號 </label>
      <input
        v-model.trim.lazy="account"
        id="account"
        type="text"
        autocomplete="username"
      />
    </div>

    <div
      class="form-row d-flex flex-column"
    >
      <label for="name">名稱</label>
      <input
        v-model.trim="name"
        id="name"
        type="text"
        autocomplete="nickname"
      />
    </div>

    <div
      class="form-row d-flex flex-column"
    >
      <label for="email">Email</label>
      <input
        v-model.trim="email"
        id="email"
        type="email"
        autocomplete="email"
      />

    </div>

    <div
      class="form-row d-flex flex-column"
    >
      <label for="password">密碼</label>
      <input
        v-model.trim="password"
        id="password"
        type="password"
        autocomplete="new-password"
      />
    </div>

    <div
      class="form-row d-flex flex-column"
    >
      <label for="passwordCheck">密碼確認</label>
      <input
        v-model.trim="passwordCheck"
        id="passwordCheck"
        type="password"
        autocomplete="new-password"
      />
    </div>

    <button class="register" type="submit" :disabled="isProcessing">
      註冊
    </button>

    <router-link class="cancel" to="/login">取消</router-link>
  </form>
</template>

<script>
import authorizationAPI from '../apis/authorization'

export default {
  data() {
    return {
      account: '',
      accountHint: false,
      name: '',
      email: '',
      emailHint: false,
      password: '',
      passwordHint: false,
      passwordCheck: '',
      checkHint: false,
      isProcessing: false
    }
  },
  methods: {
    emailFormat() {
      const emailRule = /[^@\s]+@[^@\s]+\.[^@\s]+/
      if (this.email && !emailRule.test(this.email)) {
        this.$bus.$emit('toast', { icon: 'error', title: 'Email 格式錯誤' })
        this.emailHint = true
      } else {
        this.emailHint = false
      }
    },
    passwordLength() {
      if (this.password && this.password.length < 4) {
        this.$bus.$emit('toast', { icon: 'error', title: '密碼至少要有四個字' })

        this.passwordHint = true
      } else {
        this.passwordHint = false
      }
    },
    checkPassword() {
      if (
        this.password &&
        this.passwordCheck &&
        this.password !== this.passwordCheck
      ) {
        this.checkHint = true
      } else {
        this.checkHint = false
      }
    },

    async handleSubmit() {
      try {
        // 前端驗證
        if (!this.account) {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '請填入想註冊的帳號'
          })

          return
        }

        if (!this.name) {
          this.$bus.$emit('toast', { icon: 'error', title: '請填入名稱' })

          return
        } else if (this.name.length > 50) {
          this.$bus.$emit('toast', { icon: 'error', title: '字數超出上限！' })
        }

        if (!this.email) {
          this.$bus.$emit('toast', { icon: 'error', title: '請填入 Email' })

          return
        }
        if (!this.password) {
          this.$bus.$emit('toast', { icon: 'error', title: '請填入密碼' })

          return
        } else if (this.password.length < 4) {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '密碼至少要有四個字'
          })

          return
        }
        // 密碼確認欄位
        if (!this.passwordCheck) {
          this.$bus.$emit('toast', { icon: 'error', title: '請再次確認密碼' })

          return
        } else if (this.password !== this.passwordCheck) {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '密碼與密碼確認輸入內容不同'
          })

          return
        }

        this.isProcessing = true

        // 發送API
        const { data } = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password
        })

        if (data.status === 'error') {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: `${data.message}`
          })
          throw new Error(data.message)
        }
        // 發送成功訊息
        this.$bus.$emit('toast', {
          icon: 'success',
          title: '註冊成功'
        })
        // 轉址
        this.$router.push({ name: 'user-login' })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log(error)
        this.$bus.$emit({ title: `${error}` })
      }
    }
  }
}

.logo {
  width: 50px;
  height: 50px;
}






.regist-btn {
  background-color: var(--theme-color);
  width: 100%;
  height: 46px;
  border-radius: 50px;
  color: var(--just-white);
  font-size: 18px;
  line-height: 26px;
  text-align: center;
  //TODO:看看邊框顏色還要不要更換，若時間充裕再來優化點擊按鈕後的動畫
  &:hover {
    background-color: var(--hover-color);
  }
  &:active,
  &:focus {
    background-color: var(--focus-color);
  }
}

<style lang="scss" scoped>
@import '../styles/formCommon.scss';
@import '../styles/loginCommon.scss';

.form-row {
  // 密碼確認欄
  &:nth-child(7) {
    margin-bottom: 50px;
  }
}
</style>
