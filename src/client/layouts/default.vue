<template>
  <div class="index">
    <input type="checkbox" class="form-control" id="bar-id" />
    <div class="main" :class="{ light: !$store.state.dark_mode }">
      <label for="bar-id" class="backdrop"></label>
      <input type="checkbox" class="form-control" id="user-id" />
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
                <uil-bars size="25px" />
              </label>
            </div>
          </div>
          <Nuxt />
        </div>
      </div>
      <uiRightbar />
    </div>
  </div>
</template>

<script>
import { UilBars, UilSearch, UilUser } from "@iconscout/vue-unicons";

export default {
  components: {
    UilBars,
    UilSearch,
    UilUser,
  },
  data() {
    return {
      dark_mode: false,
    };
  },
  async mounted() {},
};
</script>