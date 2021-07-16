<template>
  <div class="main auth" :class="{ light: !$store.state.dark_mode }">
    <Nuxt />
  </div>
</template>

<script>
import {
  UilUserSquare,
  UilKeySkeletonAlt,
  UilEnvelope,
} from "@iconscout/vue-unicons";

export default {
  components: {
    UilUserSquare,
    UilKeySkeletonAlt,
    UilEnvelope,
  },
};
</script>

<style lang="scss">
.logo-area {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}
</style>