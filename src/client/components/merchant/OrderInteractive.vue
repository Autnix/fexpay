<template>
  <div class="interactive-area f-1">
    <div class="card shadow-init">
      <button
        v-if="!isLogin"
        class="button b-primary b-block b-with-fexpay"
        @click.prevent="loginWithFexPay"
      >
        <img src="~/assets/img/logo/fexpay-light.svg" height="25px" alt="" />
        <span>FEXPAY HESABIN İLE ÖDE</span>
      </button>

      <div v-else class="logged-in">
        <div class="logged-avatar">
          <img :src="getUserAvatar" height="45px" alt="" />
        </div>
        <div class="logged-content"></div>
      </div>

      <div class="or">
        <small>YA DA</small>
      </div>

      <OrderInteractiveComponent :product="product" />
    </div>
  </div>
</template>

<script>
import OrderInteractiveComponent from '@/components/merchant/components/OrderInteractiveComponent.vue'

export default {
  components: {
    OrderInteractiveComponent,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.user.authenticated
    },
    getUserAvatar() {
      return this.getUser.info.defaultAvatar
        ? `https://avatars.dicebear.com/api/initials/${this.getUser.info.fullname}.svg?background=%23274AD2`
        : this.getUser.info.avatarUrl
    },
    getUser() {
      return this.$store.state.user.data
    },
  },
  methods: {
    loginWithFexPay() {
      window.location.href = '/auth/login?redirect=' + this.$route.path
    },
  },
}
</script>

<style lang="scss" scope>
.interactive-area {
  margin-left: 25px;
  .logged-in {
    display: flex;
    background-color: rgba(var(--primary-color-rgb), 0.1);
    padding: 5px;
    border-radius: 5px;
    .logged-avatar {
      display: flex;
      align-items: center;
      img {
        border-radius: 5px;
      }
    }
    .logged-content {
      flex-grow: 1;
    }
  }
  .or {
    display: flex;
    align-items: center;
    margin: 20px 2px 10px 2px !important;
    small {
      margin: 0 10px !important;
      font-size: 12px;
      opacity: 0.7;
      letter-spacing: 0.3px;
      width: fit-content;
      min-width: max-content;
    }
    &::before {
      content: '';
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      width: 100%;
    }
    &::after {
      content: '';
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      width: 100%;
    }
  }
  .component-area {
    margin: 15px 0;
  }

  .b-with-fexpay {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-weight: 600;
      font-size: 14px;
      color: white;
    }
    // letter-spacing: 0.5px;
    img {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  .b-with-cc {
    font-weight: 500;
    font-size: 14px;
    strong {
      color: white;
    }
  }
  .merchant-title {
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.7px;
  }
  .merchant-subtitle {
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.7px;
  }
}
</style>