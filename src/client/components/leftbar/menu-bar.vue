<template>
  <div class="menu-bar">
    <ul class="menu">
      <li class="active">
        <a href="#">
          <uil-tachometer-fast-alt size="20px" class="icon" /> Ana Sayfa
        </a>
      </li>
      <li>
        <a href="#"> <uil-bill size="20px" class="icon" /> Tahsilatlar </a>
      </li>
      <li>
        <a href="#">
          <uil-credit-card size="20px" class="icon" /> Kartlarım ve Hesaplarım
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  UilTachometerFastAlt,
  UilBill,
  UilCreditCard,
} from "@iconscout/vue-unicons";

export default {
  components: {
    UilTachometerFastAlt,
    UilBill,
    UilCreditCard,
  },
};
</script>

<style lang="scss" scoped>
.menu-bar {
  // padding: 0 10px;
  ul.menu {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    li {
      padding: 10px 15px;
      transition: 200ms all;
      cursor: pointer;
      &:hover {
        background-color: rgba(var(--primary-color-rgb), 0.2) !important;
        a {
          opacity: 1;
        }
      }
      &.active {
        border-right: 4px solid var(--primary-color);
        background-color: rgba(var(--primary-color-rgb), 0.1);
        a {
          color: var(--primary-color);
          opacity: 1;
          svg {
            fill: var(--primary-color);
          }
        }
      }
      a {
        transition: 200ms all;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        opacity: 0.8;
        color: var(--text-color);
        .icon {
          margin: 0 15px 2px 0;
        }
      }
    }
  }
}
</style>