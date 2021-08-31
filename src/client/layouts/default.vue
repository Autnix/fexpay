<template>
  <div class="index">
    <uiErrorHandle />
    <input id="bar-id" type="checkbox" class="form-control" />
    <div class="main" :class="{ light: lightMode }">
      <label for="bar-id" class="backdrop"></label>
      <input id="user-id" type="checkbox" class="form-control" />
      <uiLeftbar />
      <div class="content">
        <div class="page">
          <div class="topbar">
            <div class="left">
              <div class="user-icon">
                <label for="user-id">
                  <uil-user size="25px" />
                </label>
              </div>
              <div class="search">
                <input
                  type="text"
                  class="searchbar"
                  placeholder="Sipariş Ara"
                />
                <div class="search-icon">
                  <uil-search size="20px" />
                </div>
              </div>
              <div class="top-logo">
                <a class="logo-a">
                  <img
                    v-if="$store.state.dark_mode"
                    src="~/assets/img/logo/fexpay-light-text.svg"
                    height="25px"
                    draggable="false"
                    alt=""
                  />
                  <img
                    v-else
                    src="~/assets/img/logo/fexpay-dark-text.svg"
                    height="25px"
                    draggable="false"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div class="bar-icon">
              <label for="bar-id">
                <uil-credit-card-search size="25px" />
              </label>
            </div>
          </div>
          <Nuxt keep-alive :keep-alive-props="{ max: 10 }" />
        </div>
      </div>
      <uiRightbar />
    </div>
  </div>
</template>

<script>
import { UilSearch, UilUser, UilCreditCardSearch } from '@iconscout/vue-unicons'

export default {
  components: {
    UilCreditCardSearch,
    UilSearch,
    UilUser,
  },
  middleware: ['auth'],
  data() {
    return {
      dark_mode: false,
    }
  },
  computed: {
    lightMode() {
      return !this.$store.state.dark_mode
    },
  },
  async mounted() {},
}
</script>
