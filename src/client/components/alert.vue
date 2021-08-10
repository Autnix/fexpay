<template>
  <div class="alert" :class="`alert-${mode}`">
    <uil-exclamation-triangle
      v-if="icon"
      size="18px"
      :style="{
        fill: `var(--b-color-${mode})`,
        'margin-right': '10px',
        'margin-bottom': '1px',
      }"
    />
    <span> {{ text }}</span>
  </div>
</template>

<script>
import { UilExclamationTriangle } from "@iconscout/vue-unicons";

export default {
  components: {
    UilExclamationTriangle,
  },
  props: {
    text: { type: String, default: null},
    icon: { type: Boolean, default: true },
    mode: {
      type: String,
      default: "danger",
    },
  },
};
</script>