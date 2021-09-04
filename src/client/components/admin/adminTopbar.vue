<template>
  <ul class="admin-topbar">
    <li
      v-for="menu in menulist"
      :key="menu.id"
      :class="{ active: menu.id === active }"
    >
      <nuxt-link tag="a" :to="'/dashboard' + menu.path" href="#">{{
        menu.title
      }}</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      menulist: [
        { id: 1, title: 'Ana Sayfa', path: '/admin' },
        { id: 2, title: 'Kayıtlar', path: '/admin/logs' },
      ],
    }
  },
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
        color: white;
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