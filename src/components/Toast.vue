<template>
  <transition-group tag="div" class="toaster" name="toast">
    <!-- account 已重複註冊 -->
    <div
      v-for="(toast, index) in toastList"
      :key="index"
      class="toast d-flex align-items-center justify-content-between"
    >
      <p>{{ toast.title }}</p>
      <!-- error SVG -->
      <svg
        v-if="toast.icon === 'error'"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.12" cx="28" cy="28.0001" r="28" fill="#FC5A5A" />
        <path
          d="M28 18C22.48 18 18 22.48 18 28C18 33.52 22.48 38 28 38C33.52 38 38 33.52 38 28C38 22.48 33.52 18 28 18ZM29 33H27V31H29V33ZM29 29H27V23H29V29Z"
          fill="#FC5A5A"
        />
      </svg>
      <!-- success SVG -->
      <svg
        v-if="toast.icon === 'success'"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.12" cx="28" cy="28.0001" r="28" fill="#82C43C" />
        <path
          d="M22.4376 28.6426C22.1635 28.4177 21.8063 28.2956 21.4377 28.301C21.069 28.3063 20.7162 28.4386 20.4501 28.6713C20.1839 28.904 20.024 29.22 20.0025 29.5557C19.981 29.8915 20.0994 30.2223 20.3341 30.4817L23.5771 33.5869C23.7128 33.7169 23.876 33.8204 24.0567 33.8914C24.2375 33.9624 24.4321 33.9994 24.6288 34.0001C24.8246 34.0011 25.0185 33.9663 25.1992 33.8976C25.3799 33.8289 25.5436 33.7278 25.6806 33.6003L35.5849 24.2713C35.7191 24.1453 35.8249 23.9964 35.8961 23.8331C35.9673 23.6698 36.0026 23.4953 35.9999 23.3195C35.9971 23.1438 35.9565 22.9703 35.8803 22.8089C35.8041 22.6475 35.6938 22.5013 35.5556 22.3788C35.4175 22.2563 35.2543 22.1598 35.0753 22.0949C34.8963 22.0299 34.705 21.9977 34.5124 22.0002C34.3198 22.0027 34.1296 22.0398 33.9527 22.1093C33.7758 22.1788 33.6156 22.2795 33.4813 22.4055L24.6434 30.7483L22.4376 28.6426Z"
          fill="#82C43C"
        />
      </svg>
    </div>
  </transition-group>
</template>

<script>
export default {
  data() {
    return {
      toastList: []
    }
  },

  watch: {
    toastList() {
      if (this.toastList.length >= 8) {
        this.toastList.splice(-1, 4)
      } else if (this.toastList.length) {
        setTimeout(() => {
          this.toastList.splice(-1, 1)
        }, 3000)
      }
    }
  },

  // 監聽 event bus
  beforeMount() {
    this.$bus.$on('toast', (toast) => {
      this.toastList.unshift(toast)
    })
  },
  beforeDestroy() {
    // this.$bus.$off('toast')
  }
}
</script>

<style lang="scss" scoped>
.toaster {
  z-index: 1;
  position: fixed;
  top: 0%;
  left: 0%;
  padding-top: 0;
  padding-left: 3rem;

  width: max-content;
  max-width: 100%;
}

.toast {
  margin-top: 20px;
  width: 394px;
  padding: 20px;

  font-size: 20px;
  line-height: 28px;
  font-family: Roboto;
  font-weight: 700;

  color: #000;
  background-color: #fff;

  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04),
    0px 4px 16px rgba(51, 51, 51, 0.08);
  border-radius: 8px;
}

// Vue transition
.toast-enter-active,
.toast-leave-active,
.toast-move {
  transition: opacity 0.35s ease-out, transform 0.35s ease-out;
}

.toast-enter {
  opacity: 0%;
  transform: translateY(-25%);
}

.toast-leave-to {
  opacity: 0%;
  transform: translateY(40%);
}
</style>
