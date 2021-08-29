<template>
  <div
    class="error-handle"
    :class="{ 'error-show': $store.state.error.display }"
  >
    <span>
      <span class="icon"> <uil-comment-alt-exclamation size="20" /> </span>
      {{ $store.state.error.message }}</span
    >
    <a href="#" @click.prevent="close()">
      <uil-times size="25" />
    </a>
  </div>
</template>

<script>
import { UilTimes, UilCommentAltExclamation } from '@iconscout/vue-unicons'

export default {
  components: {
    UilTimes,
    UilCommentAltExclamation,
  },
  methods: {
    close() {
      this.$store.dispatch('error/down')
    },
  },
}
</script>

<style lang="scss">
.error-handle {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: var(--b-color-danger);
  z-index: 99999;
  transition: 200ms all;

  transform: translateY(-100%);
  &.error-show {
    transform: translateY(0);
    // position: sticky;
  }

  &:hover {
    span {
      opacity: 1;
    }
  }

  span {
    font-size: 14px;
    opacity: 0.9;
    transition: 200ms opacity;
    display: flex;
    align-items: center;
    span.icon {
      opacity: 1;
      margin-right: 5px;
    }
  }

  a {
    opacity: 0.7;
    transition: 200ms opacity;
    &:hover {
      opacity: 1;
    }
  }
}
</style>