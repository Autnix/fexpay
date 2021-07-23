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
        <h2 class="main-title">Giriş Yap</h2>
        <p class="main-desc">
          Giriş yapmak için lütfen sisteme kayıtlı e-posta adresini ve şifreni
          gir.
        </p>

        <form class="login-form" @submit.prevent="login()">
          <alert v-if="error.status" :text="error.text" />
          <div class="i-group">
            <input
              v-model="user.email"
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

          <div class="i-group">
            <input
              v-model="user.password"
              type="password"
              placeholder="Şifre"
              class="f-control"
            />
            <div class="group-icon">
              <span>
                <uil-key-skeleton-alt height="25px" />
              </span>
            </div>
          </div>

          <button class="button b-block b-bold">Giriş Yap</button>
        </form>
      </div>
      <div class="overlay">
        <img src="~assets/img/vector.svg" width="70%" alt="" />
      </div>
    </div>
    <div class="footer-info">
      <small
        >Bir hesaba sahip değil misin?
        <nuxt-link tag="a" to="/auth/register" href="#"
          >Hemen Kayıt Ol</nuxt-link
        >
      </small>
    </div>
  </div>
</template>

<script>
import { UilKeySkeletonAlt, UilEnvelope } from "@iconscout/vue-unicons";

export default {
  layout: "auth",
  components: {
    UilKeySkeletonAlt,
    UilEnvelope,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      error: {
        status: false,
        text: null,
      },
    };
  },
  methods: {
    async login() {
      this.error.status = false;

      let data = await this.$axios
        .post("/auth/login", this.user)
        .then((res) => res.data)
        .catch((err) => {
          this.error = {
            status: true,
            text: err.response.data.message,
          };
          return null;
        });

      if (!data) return;

      await this.$store.dispatch("user/login", data.user);
      this.$router.push("/");
    },
  },
};
</script>