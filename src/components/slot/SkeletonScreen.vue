<template>
  <transition name="skeleton" mode="out-in">
    <span v-if="isLoading && skeleton === 'span'" class="loading-mask">
      <slot name="skeletonLength"></slot>
    </span>

    <div v-if="isLoading && skeleton === 'div'" class="loading-mask">
      <slot name="skeletonLength"></slot>
    </div>

    <slot v-if="!isLoading" name="originalNode"></slot>
  </transition>
</template>

<style lang="scss" scoped>
.modal-body {
  // mask for skeleton animation
  .loading-mask {
    position: relative;
    width: 100%;

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
      // background: linear-gradient(110deg, #ececec 10%, #f7f7f7 20%, #ececec 30%);
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
  .skeleton-enter,
  .skeleton-leave-to {
    opacity: 0;
  }

  .skeleton-enter-active {
    transition: opacity 0.8s ease-in;
  }
}
</style>

<script>
export default {
  props: {
    isLoading: { type: Boolean, required: true, default: true },
    skeleton: { type: String, default: 'span' }
  }
}
</script>
