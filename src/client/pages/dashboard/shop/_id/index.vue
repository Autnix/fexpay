<template>
  <div class="page-full">
    <div v-if="$fetchState.pending"></div>
    <div v-else-if="$fetchState.error"></div>
    <div v-else class="card">
      <div class="shop-header">
        <div class="header-logo">
          <img :src="`/uploads/shop-images/${shop.images.logo}`" alt="" />
        </div>
        <div class="header-details">
          <h4 class="shop-title">{{ shopName }}</h4>
          <span class="shop-website"
            ><a :href="shopWebsite" target="_blank"> {{ shopWebsite }} </a>
          </span>
        </div>
      </div>
      <div class="shop-header-bottom">
        <div class="area">
          <button class="button b-info"><uil-edit size="17px" /></button>
          <button class="button b-secondary">
            <uil-pricetag-alt size="17px" />
          </button>
          <button class="button b-danger">
            <uil-trash-alt size="17px" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UilEdit, UilPricetagAlt, UilTrashAlt } from '@iconscout/vue-unicons'

export default {
  components: {
    UilEdit,
    UilPricetagAlt,
    UilTrashAlt,
  },
  data() {
    return {
      shop: null,
    }
  },
  async fetch() {
    const data = await this.$axios
      .post(
        '/shop/get',
        { id: this.$route.params.id },
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.data?.token}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => err.response)
    if (data.status !== 200) {
      const error = data?.error || 'Bilinmeyen bir hata meydana geldi!'
      await this.$store.dispatch('error/up', error)
      this.$router.push({ name: 'dashboard-shop' })
      throw new Error(error)
    }

    this.shop = data.shop
  },
  fetchOnServer: false,
  computed: {
    shopName() {
      return this.shop?.info?.name
    },
    shopWebsite() {
      return this.shop?.info?.website
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-header {
  height: 50px;
  background-color: rgba(var(--b-color-primary-rgb), 0.2);
  display: flex;
  position: relative;
  padding-left: 95px;
  align-items: center;
  border-radius: 5px;
  .header-logo {
    height: 75px;
    width: 75px;
    max-width: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    background-color: rgba(var(--b-color-primary-rgb), 0.7);
    padding: 5px;
    position: absolute;
    top: 10px;
    left: 10px;
    img {
      width: 100%;
    }
  }
  .header-details {
    display: flex;
    flex-direction: column;
    .shop-title {
      font-weight: 600;
      letter-spacing: 0.7px;
      font-size: 16px;
      line-height: 16px;
      margin-bottom: 2px;
    }
    .shop-website {
      font-size: 12px;
      line-height: 12px;
      a {
        opacity: 0.6;
        font-weight: 400;
        transition: 200ms opacity;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
.shop-header-bottom {
  height: 45px;
  padding-left: 95px;
  .area {
    display: flex;
    padding-top: 5px;
    height: 100%;
    align-items: flex-start;
    button {
      padding: 5px;
      margin: 0;
      margin-top: 2px;
      margin-right: 5px;
    }
  }
}
</style>