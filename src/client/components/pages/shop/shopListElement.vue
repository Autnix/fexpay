<template>
  <li>
    <div class="shop-data">
      <div class="icon">
        <uil-shop size="30" />
      </div>
      <div class="shop-data-in">
        <h2 class="shop-title">
          <nuxt-link tag="a" :to="'/dashboard/shop/' + shop._id" href="#">
            {{ shop.info.name }}
          </nuxt-link>
        </h2>
        <div class="shop-details">
          <a :href="shop.info.website" target="_blank">{{
            shop.info.website
          }}</a>
        </div>
      </div>
    </div>
    <div class="shop-earning">
      <div class="icon"><uil-money-withdraw size="65" /></div>
      <div class="head">Toplam Kazanç</div>
      <div class="data">125.00 ₺</div>
    </div>
    <div class="shop-earning">
      <div class="icon"><uil-bill size="65" /></div>
      <div class="head">Haftalık Kazanç</div>
      <div class="data">28.30 ₺</div>
    </div>
  </li>
</template>

<script>
import { UilShop, UilMoneyWithdraw, UilBill } from '@iconscout/vue-unicons'

export default {
  components: {
    UilShop,
    UilMoneyWithdraw,
    UilBill,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    shop: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  overflow-x: auto;
  margin-bottom: 10px;
  .shop-data {
    flex-grow: 1;
    background-color: rgba(var(--card-color-rgb), 0.2);
    border: 1px solid rgba(var(--card-color-rgb), 0.4);
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    .icon {
      background-color: var(--b-color-primary);
      padding: 10px;
      border-radius: 5px;
      margin-right: 10px;
      svg {
        fill: #fff;
      }
    }
    .shop-data-in {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h2.shop-title {
        font-size: 18px;
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-bottom: 3px;
        a {
          transition: 200ms color;
          &:hover {
            color: var(--primary-color);
          }
        }
      }
      .shop-details {
        font-size: 12px;
        opacity: 0.8;
        display: inline;
        transition: 200ms opacity;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .shop-earning {
    background-color: rgba(var(--card-color-rgb), 0.2);
    border: 1px solid rgba(var(--card-color-rgb), 0.4);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
    padding-right: 45px;
    margin-left: 10px;
    position: relative;
    overflow: hidden;
    min-width: 140px;

    .icon {
      position: absolute;
      top: -10px;
      right: -25px;
      opacity: 0.4;
      svg {
        fill: var(--b-color-primary);
      }
    }
    .head {
      font-size: 12px;
      opacity: 0.8;
      z-index: 5;
    }
    .data {
      font-size: 16px;
      font-weight: 600;
      z-index: 5;
    }
  }
}
</style>