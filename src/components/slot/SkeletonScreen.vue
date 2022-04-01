<template>
  <transition name="skeleton" mode="out-in">
    <!-- 直接替換為skeleton -->
    <template v-if="!custom">
      <span
        v-if="isLoading && skeleton === 'span'"
        class="skeleton"
        v-html="skeletonSpace"
      >
      </span>

      <div
        v-if="isLoading && skeleton === 'div'"
        class="skeleton"
        v-html="skeletonSpace"
      ></div>
    </template>

    <!-- 用::after 覆蓋 skeletonContent slot 的內容 -->
    <template v-if="custom">
      <span v-if="isLoading && skeleton === 'span'" class="skeleton-mask">
        <slot name="skeletonContent"></slot>
      </span>

      <div v-if="isLoading && skeleton === 'div'" class="skeleton-mask">
        <slot name="skeletonContent"></slot>
      </div>
    </template>

    <slot v-if="!isLoading" name="originalNode"></slot>
  </transition>
</template>

<style lang="scss" scoped>
.skeleton {
  height: 100%;
  border-radius: 0.75rem;

  // background-size: 200% 100%;
  // background-image: linear-gradient(
  //   110deg,
  //   #ececec 6%,
  //   #f5f5f5 18%,
  //   #ececec 33%
  // );
  // animation: scan 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;

  background-color: #ececec;
  animation: shine 0.8s ease-in-out alternate-reverse infinite;
}

// mask for skeleton animation
.skeleton-mask {
  position: relative;
  width: 100%;
  height: 100%;

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0.75rem;

    // background-size: 200% 100%;
    // background-image: linear-gradient(
    //   110deg,
    //   #ececec 6%,
    //   #f5f5f5 18%,
    //   #ececec 33%
    // );
    // animation: scan 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;

    background-color: #ececec;
    animation: shine 0.8s ease-in-out alternate-reverse infinite;
  }
}

@keyframes scan {
  to {
    background-position-x: -200%;
  }
}

@keyframes shine {
  from {
    background-color: #ececec;
  }

  to {
    background-color: #f5f5f5;
  }
}

// vue transition
// for for skeleton animation
.skeleton-enter {
  opacity: 0;
}

.skeleton-enter-active {
  transition: opacity 0.35s ease-out;
}
</style>

<script>
export default {
  props: {
    isLoading: { type: Boolean, required: true, default: true },
    skeleton: { type: String, default: 'span' },
    custom: { type: Boolean, default: false },
    skeletonLength: { type: Number, required: false, default: 0 },
    skeletonLine: { type: Number, required: false, default: 0 }
  },

  computed: {
    skeletonSpace() {
      let content = ''
      for (let space = 0; space < this.skeletonLength; space++) {
        content += `&emsp;`
      }

      for (let line = 0; line < this.skeletonLine; line++) {
        for (let space = 0; space < this.skeletonLength; space++) {
          content += `&emsp;`
        }
        content += `<br/>`
      }
      return content
    }
  }
}
</script>
