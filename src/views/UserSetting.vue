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
        >
          <label for="account">帳號</label>

          <div class="d-flex">
            <span>@</span>
            <input
              v-model.trim="account"
              id="account"
              type="text"
            />
          </div>

        </div>

        <div
          class="form-row d-flex flex-column"
        >
          <label for="name">名稱</label>
          <input
            v-model.trim="name"
            type="text"
            id="name"
          />
        </div>

        <div
          class="form-row d-flex flex-column"
        >
          <label for="email">Email</label>
          <input
            v-model.trim="email"
            class="email"
            type="email"
            id="email"
          />
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
        >
          <label for="password">密碼</label>
          <input
            v-model.trim="password"
            type="password"
            id="password"
          />
        </div>

        <div
          class="form-row d-flex flex-column"
        >
          <label for="passwordCheck">密碼確認</label>
          <input
            v-model.trim="passwordCheck"
            type="password"
            id="passwordCheck"
          />
        </div>

        <div class="footer">

          <button
            type="submit"
            class="save"
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
      account: '',
      name: '',
      email: '',
      emailCheck: false,
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  watch: {
    email(newInput) {
      newInput.match(/[^@\s]+@[^@\s]+\.[^@\s]+/)
        ? (this.emailCheck = true)
        : (this.emailCheck = false)

    },
  methods: {
    async handleSubmit() {
      try {
        // 前端驗證
        if (!this.account) {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: '請填入想更改的帳號'
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
        } else if (!/[^@\s]+@[^@\s]+\.[^@\s]+/.test(this.email)) {
          this.$bus.$emit('toast', { icon: 'error', title: 'Email 格式錯誤' })
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

        const { data } = await userAPI.editAccount({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password
        })

        console.log(data)

        if (data.status === 'success') {
          this.$bus.$emit('toast', {
            icon: 'success',
            title: '資料修改成功'
          })
          this.isProcessing = false
        } else {
          this.$bus.$emit('toast', {
            icon: 'error',
            title: `${data.message}`
          })
          throw new Error(data.message)
        }
      } catch (error) {
        this.isProcessing = false
        console.log(error)
        this.$bus.$emit('toast', {
          icon: 'error',
          title: `${data.message}`
        })
      }
    },
    async fetchAccount() {
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
      } catch (error) {
        console.log(error)
        this.$bus.$emit({ title: `${error}` })
      }
    }
  },
  created() {
    this.fetchAccount()
  },
  components: {
    Sidebar
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
