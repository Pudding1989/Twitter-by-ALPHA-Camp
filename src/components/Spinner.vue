<template>
  <div class="spinner center">
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
  </div>
</template>

<style lang="scss" scoped>
// 來源： https://codepen.io/jmak/pen/bGPzrQ?editors=1100

$spinner-size: 36px;
$spinner-color: var(--info);
$overlay-color: transparent;

@mixin absolute-center {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.spinner {
  // overlay
  z-index: 1;
  background: $overlay-color;
  @include absolute-center;

  font-size: $spinner-size;
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;

  &.center {
    @include absolute-center;
  }
}

.spinner-blade {
  position: absolute;
  left: 0.4629em;
  bottom: 0;
  width: 0.074em;
  height: 0.2777em;
  border-radius: 0.5em;
  background-color: transparent;
  transform-origin: center -0.2222em;
  animation: spinner-fade 1s infinite linear;

  $animation-delay: 0s;
  $blade-rotation: 0deg;

  @for $i from 1 through 12 {
    &:nth-child(#{$i}) {
      animation-delay: $animation-delay;
      transform: rotate($blade-rotation);
      $blade-rotation: $blade-rotation + 30;
      $animation-delay: $animation-delay + 0.083;
    }
  }
}

@keyframes spinner-fade {
  0% {
    background-color: $spinner-color;
  }

  100% {
    background-color: transparent;
  }
}
</style>
