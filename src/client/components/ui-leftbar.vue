<template>
  <div class="left-bar">
    <div class="profile-and-menu">
      <ProfileInfoBar />
      <MenuBar />
    </div>
    <RecommendsBar />
  </div>
</template>

<script>
import ProfileInfoBar from "@/components/leftbar/profile-info-bar";
import RecommendsBar from "@/components/leftbar/recommends-bar";
import MenuBar from "@/components/leftbar/menu-bar";

export default {
  components: {
    ProfileInfoBar,
    RecommendsBar,
    MenuBar,
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
}
</style>