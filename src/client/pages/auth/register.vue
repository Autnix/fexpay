<template>
  <div class="main-cont">
    <div class="auth-container">
      <div class="form-side">
        <div class="logo-area">
          <div class="logo-img">
            <img
              v-if="$store.state.dark_mode"
              src="~/assets/img/logo/fexpay-light-text.svg"
              height="45px"
              draggable="false"
              alt=""
            />
            <img
              v-else
              src="~/assets/img/logo/fexpay-dark-text.svg"
              height="45px"
              draggable="false"
              alt=""
            />
          </div>
        </div>
        <h2 class="main-title">Kayıt Ol</h2>
        <p class="main-desc">
          PayButik fırsatlarından yararlanmak için hemen ücretsiz kayıt ol.
        </p>

        <form class="login-form" @submit.prevent="registerEvent()">
          <div class="i-group">
            <input
              type="text"
              class="f-control"
              placeholder="Adınız ve soyadınız"
            />
            <div class="group-icon">
              <span>
                <uil-user height="25px" />
              </span>
            </div>
          </div>

          <div class="i-group">
            <input
              type="email"
              placeholder="E-posta Adresi"
              class="f-control"
            />
            <div class="group-icon">
              <span>
                <uil-envelope height="25px" />
              </span>
            </div>
          </div>

          <!-- <client-only> -->
          <!-- <vue-phone-number-input
            v-model="myData"
            :dark="$store.state.dark_mode"
            default-country-code="TR"
            dark-color="#273973"
            valid-color="#E3E8FD"
            :border-radius="3"
            :no-example="false"
            :translations="{
              countrySelectorLabel: 'Ülke Kodu',
              phoneNumberLabel: 'Telefon Numarası',
              example: 'Örnek:',
            }"
          /> -->
          <!-- </client-only> -->

          <div class="i-group">
            <input type="password" placeholder="Şifre" class="f-control" />
            <div class="group-icon">
              <span>
                <uil-key-skeleton-alt height="25px" />
              </span>
            </div>
          </div>

          <button class="button b-block b-bold">Kayıt Ol</button>
        </form>
      </div>
      <div class="overlay">
        <img src="~assets/img/register.svg" width="70%" alt="" />
      </div>
    </div>
    <div class="footer-info">
      <small
        >Zaten bir hesaba sahip misin?
        <nuxt-link tag="a" to="/auth/login" href="#">Hemen Giriş Yap</nuxt-link>
      </small>
    </div>
    <input type="checkbox" id="popup-checkbox" v-model="bottomPopupCheckbox" />
    <div class="bottom-popup">
      <label for="popup-checkbox"></label>
      <div class="popup-container"></div>
    </div>
  </div>
</template>

<script>
import {
  UilUser,
  UilKeySkeletonAlt,
  UilEnvelope,
} from "@iconscout/vue-unicons";

export default {
  data() {
    return {
      myData: null,
      bottomPopupCheckbox: false,
    };
  },
  components: {
    UilUser,
    UilKeySkeletonAlt,
    UilEnvelope,
  },
  layout: "auth",
  methods: {
    registerEvent() {
      this.bottomPopupCheckbox = true;
    },
  },
};
</script>

<style lang="scss">
.vue-phone-number-input input {
  border: 0 !important;
  background-color: rgba(var(--primary-color-rgb), 0.1) !important;
}
</style>