<template>
  <div>
    <h5 class="title merchant-title">Bir ödeme yöntemi seç</h5>
    <ul class="methods">
      <li
        v-for="method in methods"
        :key="method._id"
        :class="{ active: currentMethod === method._id }"
      >
        <div class="method-icon">
          <!-- <uil-credit-card size="25px" /> -->
          <component :is="method.info.icon" size="25px" />
        </div>
        <div class="method-title">{{ method.info.publicTitle }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { UilCreditCard, UilUniversity, UilPaypal } from '@iconscout/vue-unicons'

export default {
  components: {
    UilCreditCard,
    UilUniversity,
    UilPaypal,
  },
  props: {
    methods: {
      type: Array,
      default: () => [],
    },
    currentMethod: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.methods {
  display: flex;
  margin: 10px 0;
  li {
    // height: 50px;
    width: 150px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px 7px;
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    cursor: pointer;
    transition: 200ms all;
    .method-title {
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      margin-left: 1px;
    }
    &.active {
      border-color: rgba(0, 0, 0, 0.8);
      background-color: rgba(0, 0, 0, 0.02);
      .method-icon svg {
        fill: rgba(0, 0, 0, 0.8);
      }
      .method-title {
        color: rgba(0, 0, 0, 0.8);
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
  }
}
</style>