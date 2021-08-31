<template>
  <div class="page-full">
    <h2 class="main-title">Mağazalarım</h2>
    <div class="sub">
      <span class="main-desc">Aktif Mağazalarım</span>
      <span class="main-desc link">
        <nuxt-link tag="a" :to="{ name: 'dashboard-shop-create' }" href="#">
          <uil-plus-circle size="16" style="fill: var(--primary-color)" /> Yeni
          mağaza ekle</nuxt-link
        >
      </span>
    </div>
    <div class="shops">
      <ul v-if="$fetchState.pending">
        <SkeletonTheme
          color="var(--skeleton-color)"
          highlight="var(--skeleton-highlight)"
        >
          <li v-for="n in 3" :key="n" class="skeleton-shop">
            <div class="skeleton-shop-data">
              <Skeleton height="74px"></Skeleton>
            </div>
            <div class="skeleton-shop-earning">
              <Skeleton height="74px"></Skeleton>
            </div>
            <div class="skeleton-shop-earning">
              <Skeleton height="74px"></Skeleton>
            </div>
          </li>
        </SkeletonTheme>
      </ul>
      <!-- <UiErrorHandle
        v-if="$fetchState.error"
        message="Bir hata meydana geldi! Daha sonra tekrar deneyin."
      />0 -->
      <div v-else-if="$fetchState.error"></div>
      <ul v-else>
        <shop-list-element v-for="shop in shops" :key="shop._id" :shop="shop" />
      </ul>
    </div>
  </div>
</template>

<script>
import { UilPlusCircle } from '@iconscout/vue-unicons'
import { Skeleton, SkeletonTheme } from 'vue-loading-skeleton'

import shopListElement from '@/components/pages/shop/shopListElement'

export default {
  components: {
    UilPlusCircle,
    shopListElement,
    Skeleton,
    SkeletonTheme,
  },
  data() {
    return {
      content: null,
      shops: [],
    }
  },
  async fetch() {
    const { data } = await this.$axios
      .get('/shop/get-all', {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.data?.token}`,
        },
      })
      .catch((e) => {
        this.$store.dispatch('error/up', 'Bir hata meydana geldi!')
      })

    this.shops = data.shops
  },
  fetchOnServer: false,
}
</script>

<style lang="scss" scoped>
.shops {
  margin-top: 10px;
  li.skeleton-shop {
    display: flex;
    height: 74px;
    margin-bottom: 10px;
    .skeleton-shop-data {
      flex-grow: 1;
    }
    .skeleton-shop-earning {
      width: 142px;
      margin-left: 10px;
    }
  }
}
</style>