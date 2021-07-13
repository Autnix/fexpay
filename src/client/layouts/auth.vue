<template>
  <div class="main auth" :class="{ light: !$store.state.dark_mode }">
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
          <h2 class="main-title">
            <uil-key-skeleton-alt height="21px" />
            Giriş Yap
          </h2>
          <p class="main-desc">
            Giriş yapmak için lütfen sisteme kayıtlı e-posta adresini ve şifreni
            gir.
          </p>

          <form class="login-form">
            <input type="text" placeholder="E-posta Adresi" />
            <input type="password" placeholder="Şifre" />
            <button class="button-submit">Giriş Yap</button>
          </form>
        </div>
        <div class="overlay">
          <img src="~assets/img/vector.svg" width="70%" alt="" />
        </div>
      </div>
      <div class="footer-info">
        <small
          >Bir hesaba sahip değil misin? <a href="#">Hemen Kayıt Ol</a>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { UilUserSquare, UilKeySkeletonAlt } from "@iconscout/vue-unicons";

export default {
  components: {
    UilUserSquare,
    UilKeySkeletonAlt,
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