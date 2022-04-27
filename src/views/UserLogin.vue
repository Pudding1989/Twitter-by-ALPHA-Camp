<template>
  <form
    class="form-area d-flex flex-column align-items-center"
    @submit="handleSubmit"
  >

    <div
      class="form-row d-flex flex-column"
    >
      <label for="account">帳號</label>
      <input
        v-model.trim="account"
        :disabled="isProcessing"
        id="account"
        type="text"
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
      />
    </div>

    <button
      @click.stop.prevent="handleSubmit"
      :disabled="isProcessing"
      class="login"
      type="submit"
    >
    </button>
    <div class="link-container">
      <router-link to="/regist">註冊Alphitter</router-link>
      <span>‧</span>
      <router-link to="/admin">後台登入</router-link>
    </div>
  </form>
</template>

<script>
import authorizationAPI from '../apis/authorization'

export default {
  data() {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account) {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '請輸入帳號'
          })
          return
        }

        if (!this.password) {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '請輸入密碼'
          })
          return
        }

        this.isProcessing = true

        const { data } = await authorizationAPI.signIn({
          account: this.account,
          password: this.password
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // 將 token 存放在 localStorage
        localStorage.setItem('token', data.data.token)
        // 用commit改寫 vuex store state
        this.$store.commit('setCurrentUser', data.data.user)

           // 發送成功訊息
        this.$bus.$emit('toast', {
          icon: 'success',
          title: '登入成功'
        })
        this.$router.push({name: 'main'})
      } catch (error) {
        this.$bus.$emit('toast', { icon: 'error', title: `${error}` })
        this.isProcessing = false
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/formCommon.scss';


.logo {
  width: 50px;
  height: 50px;
}

.form-row {
  // 密碼欄
  &:nth-child(4) {
    margin-bottom: 40px;
  }


  }
}


</style>
