<template>
  <div class="page-container">
    <h2 class="main-title">Proje Seçin</h2>
    <div class="sub">
      <span class="main-desc">Projenin listeleneceği ürünü seçin</span>
    </div>
    <div class="card">
      <select v-model="shopId" class="f-control" @change="go()">
        <option value="-1" disabled>Bir ürün seçin</option>
        <option v-for="shop in shopList" :key="shop._id" :value="shop._id">
          {{ shop.info.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopId: -1,
      shopList: () => [],
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

    this.shopList = data.shops
  },
  fetchOnServer: true,
  methods: {
    go() {
      this.$router.push(`/dashboard/product/create/${this.shopId}`)
    },
  },
}
</script>