<template>
  <form
    class="form-area d-flex flex-column align-items-center"
    @submit.prevent.stop="handleSubmit"
  >


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

@import '../styles/formCommon.scss';

.form-row {
  // 密碼確認欄
  &:nth-child(7) {
    margin-bottom: 50px;
  }
}
</style>
