<template>
  <div class="left-bar">
    <div class="profile-and-menu">
      <div class="mobile-top">
        <div class="close-sidebar">
          <label for="user-id">
            <uil-times size="30px" />
          </label>
        </div>
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
  }
  .mobile-top {
    display: none;
    justify-content: flex-start;
    align-items: center;
    margin: 15px 10px 0 10px;
    .close-sidebar {
      label {
        cursor: pointer;
      }
    }
  }
}
</style>