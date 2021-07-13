<template>
  <div class="left-bar">
    <div class="profile-and-menu">
      <div class="logo-area">
        <div class="mobile-top">
          <div class="close-sidebar">
            <label for="user-id">
              <uil-times size="30px" />
            </label>
          </div>
        </div>
        <a class="logo-a">
          <img
            v-if="$store.state.dark_mode"
            src="~/assets/img/logo/fexpay-light-text.svg"
            width="170px"
            draggable="false"
            alt=""
          />
          <img
            v-else
            src="~/assets/img/logo/fexpay-dark-text.svg"
            width="170px"
            draggable="false"
            alt=""
          />
        </a>
      </div>
      <ProfileInfoBar />
      <MenuBar />
    </div>
    <RecommendsBar />
  </div>
</template>

<script>
import { UilTimes } from "@iconscout/vue-unicons";
import ProfileInfoBar from "@/components/leftbar/profile-info-bar";
import RecommendsBar from "@/components/leftbar/recommends-bar";
import MenuBar from "@/components/leftbar/menu-bar";

export default {
  components: {
    ProfileInfoBar,
    RecommendsBar,
    MenuBar,
    UilTimes,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.left-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // padding: 20px;
  .profile-and-menu {
    overflow-y: auto;
    .logo-area {
      display: flex;
      justify-content: center;
      margin-top: 15px;
      .logo-a {
        transition: 200ms transform;
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
  .mobile-top {
    display: none;
    justify-content: flex-start;
    align-items: center;
    // margin: 15px 10px 0 10px;
    .close-sidebar {
      label {
        cursor: pointer;
      }
    }
  }
}
</style>