<template>
  <div class="page-full">
    <ul class="admin-topbar">
      <li class="active">
        <a href="#">Ana Sayfa</a>
      </li>
      <li>
        <a href="#">Kayıtlar</a>
      </li>
    </ul>
    <h1>ADMIN PANEL MORUQ</h1>
  </div>
</template>

<script>
export default {
  middleware: ['admin'],
}
</script>

<style lang="scss" scoped>
.admin-topbar {
  --admin-topbar-heading: 35px;
  --admin-topbar-padding: 5px;
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  background-color: rgba(var(--light-rgb), 0.7);
  padding: var(--admin-topbar-padding);
  height: var(--admin-topbar-heading);
  min-height: var(--admin-topbar-heading);
  border-radius: calc(var(--admin-topbar-heading) / 2);
  li {
    height: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-right: 5px;
    &:last-child {
      margin-right: 0 !important;
    }
    &.active {
      background-color: rgba(var(--b-color-danger-rgb), 0.8);
      transition: 200ms background-color;
      border-radius: calc(
        (var(--admin-topbar-heading) - (var(--admin-topbar-padding) * 2)) / 2
      );
      a {
        opacity: 1;
      }
    }
    &:hover {
      &.active {
        background-color: rgba(var(--b-color-danger-rgb), 1);
      }
      a {
        opacity: 1;
      }
    }
    a {
      font-size: 14px;
      opacity: 0.7;
      transition: 200ms opacity;
    }
  }
}
</style>