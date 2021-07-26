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
              v-model="user.fullname"
              type="text"
              class="f-control"
              placeholder="Adınız ve soyadınız"
              required
            />
            <div class="group-icon">
              <span>
                <uil-user height="25px" />
              </span>
            </div>
          </div>

          <div class="i-group">
            <input
              v-model="user.email"
              type="email"
              placeholder="E-posta Adresi"
              class="f-control"
              required
            />
            <div class="group-icon">
              <span>
                <uil-envelope height="25px" />
              </span>
            </div>
          </div>

          <div class="i-group">
            <input
              v-model="user.password"
              type="password"
              placeholder="Şifre"
              class="f-control"
              required
            />
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
      <label class="popup-label"></label>
      <div class="popup-container">
        <div class="container-fix">
          <div class="popup-alerts" v-if="error.status">
            <alert :text="error.text" :icon="true" />
          </div>
          <div class="popup-head">
            <div class="head-title">
              <h2>Telefonunu Onayla</h2>
            </div>
            <div class="head-icon">
              <uil-comment-alt-shield
                size="45px"
                style="fill: var(--b-color-primary)"
              />
            </div>
          </div>

          <form
            class="popup-form"
            @submit.prevent="register()"
            v-if="popupPage == 1"
          >
            <div class="form-elements">
              <vue-phone-number-input
                v-model="user.phone"
                :dark="$store.state.dark_mode"
                default-country-code="TR"
                dark-color="#273973"
                valid-color="#E3E8FD"
                :border-radius="3"
                :no-example="true"
                :countries-height="20"
                :show-code-on-list="true"
                :translations="{
                  countrySelectorLabel: 'Ülke Kodu',
                  phoneNumberLabel: 'Telefon Numarası',
                  example: 'Örnek:',
                }"
                @update="onPhoneUpdate"
              />
            </div>

            <div class="form-submit-area flexible-division">
              <div class="f-1">
                <label
                  type="button"
                  for="popup-checkbox"
                  class="button b-secondary b-block b-bold"
                >
                  Kapat
                </label>
              </div>
              <div class="f-1">
                <button
                  class="button b-block b-bold"
                  :class="{ 'b-loading': loading }"
                  :disabled="loading == 1"
                >
                  Devam et
                </button>
              </div>
            </div>
          </form>

          <form class="popup-form" @submit.prevent="confirmUser()" v-else>
            <p class="form-desc">
              <strong>{{ user.phoneFormatted }}</strong> numaralı telefonunuza
              bir doğrulama kodu gönderdik. Lütfen doğrulama kodunu aşağıda size
              ayrılmış alana girin ve üyeliğinizi tamamlayın.
            </p>
            <div class="form-elements">
              <input
                v-model="verificationCode"
                type="number"
                class="f-control"
                placeholder="Doğrulama Kodunuz"
                pattern="[0-9]"
                @input="formatCode()"
                :required="true"
              />
              <small class="timer-info" v-if="phoneTimer != 0"
                >Doğrulama kodunu tekrar göndermek için {{ phoneTimer }} saniye
                bekleyin.
              </small>
              <small class="timer-info" v-else>
                <a
                  href="javascript:;"
                  style="color: var(--primary-color)"
                  @click.prevent="resendCode()"
                  >Doğrulama kodunu tekrar gönder</a
                >
              </small>
            </div>

            <div class="form-submit-area">
              <button
                class="button b-block b-bold"
                :class="{ 'b-loading': loading }"
                :disabled="loading == 1"
              >
                Hesabı doğrula
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  UilUser,
  UilKeySkeletonAlt,
  UilEnvelope,
  UilMobileAndroid,
  UilCommentAltShield,
} from "@iconscout/vue-unicons";

export default {
  data() {
    return {
      bottomPopupCheckbox: false,
      user: {
        fullname: null,
        email: null,
        password: null,
        phone: null,
        phoneFormatted: null,
        phoneValid: false,
      },
      error: {
        status: false,
        text: null,
      },
      popupPage: 1,
      phoneTimer: 30,
      verificationCode: null,
      loading: 0,
    };
  },
  components: {
    UilUser,
    UilKeySkeletonAlt,
    UilEnvelope,
    UilMobileAndroid,
    UilCommentAltShield,
  },
  layout: "auth",
  methods: {
    registerEvent() {
      this.bottomPopupCheckbox = true;
    },
    timerStart() {
      this.phoneTimer = 30;
      let interval = setInterval(() => {
        if (this.phoneTimer - 1 == 0) {
          clearInterval(interval);
        }
        this.phoneTimer = this.phoneTimer - 1;
      }, 1000);
    },
    async resendCode() {
      this.error.status = false;
      let data = await this.$axios
        .post("/auth/resend-verification-code", this.user)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          this.error = {
            status: true,
            text: err.response.data.message,
          };
          return null;
        });

      if (data) {
        this.timerStart();
      }
    },
    async register() {
      this.loading = 1;
      this.error.status = false;

      if (!this.user.phoneValid) {
        this.loading = 0;
        return (this.error = {
          status: true,
          text: "Lütfen telefon numaranızı doğru girdiğinizden emin olun!",
        });
      }

      let data = await this.$axios
        .post("/auth/register", this.user)
        .then((res) => {
          this.popupPage = 2;
          this.timerStart();
          return res.data;
        })
        .catch((err) => {
          this.error = {
            status: true,
            text: err.response.data.message,
          };
          return null;
        });
      this.loading = 0;
    },
    async confirmUser() {
      this.loading = 1;
      this.error.status = false;
      let data = await this.$axios
        .post("/auth/verify-phone", {
          phone: this.user.phoneFormatted,
          code: this.verificationCode,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          this.error = {
            status: true,
            text: err.response.data.message,
          };
          this.loading = 0;
          return null;
        });

      if (!data) return;

      let login = await this.$axios.post("/auth/login", this.user);

      await this.$store.dispatch("user/login", data.user);
      this.$router.push("/");
      this.loading = 0;
    },
    onPhoneUpdate(payload) {
      this.user.phoneValid = payload.isValid;
      this.user.phoneFormatted = payload.formattedNumber;
    },
    formatCode() {
      this.verificationCode = this.verificationCode.replace(/[^\d]/g, "");
      if (this.verificationCode.length >= 6)
        this.verificationCode = this.verificationCode.slice(0, 6);
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