<template>
  <div class="main auth" :class="{ light: lightMode }">
    <uiErrorHandle />
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: ['alreadyLogin'],
  computed: {
    lightMode() {
      return !this.$store.state.dark_mode
    },
  },
}
</script>

<style lang="scss">
.logo-area {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}
</style>