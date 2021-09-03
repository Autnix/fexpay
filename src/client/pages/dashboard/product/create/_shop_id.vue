<template>
  <div class="page-container">
    <h2 class="main-title">Yeni Ürün Listele</h2>
    <div class="sub">
      <span class="main-desc">Yeni bir ürün oluştur</span>
      <span class="main-desc link">
        <nuxt-link tag="a" :to="{ name: 'dashboard-product' }" href="#">
          Ürünlerimi görüntüle</nuxt-link
        >
      </span>
    </div>
    <div v-if="$fetchState.pending"></div>
    <div v-else-if="!$fetchState.error" class="shop-create">
      <ProductForm :product="product" @inputProduct="inputProduct" />
      <button class="button b-block b-bold" @click.prevent="createProduct()">
        Ürünü listele
      </button>
    </div>
  </div>
</template>

<script>
import ProductForm from '@/components/pages/product/productForm'
export default {
  components: {
    ProductForm,
  },
  data() {
    return {
      product: {
        code: null,
        billing: {
          priceCC: Number(1).toFixed(2),
        },
        info: {
          title: null,
          description: null,
          image: null,
        },
        shop: null,
      },
    }
  },
  async fetch() {
    const data = await this.$axios
      .post(
        '/shop/get',
        { id: this.$route.params.shop_id },
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
      this.$router.push({ name: 'dashboard-product' })
      throw new Error(error)
    }

    this.product.shop = data.shop
    this.product.code =
      Math.random().toString(36).slice(-8).toUpperCase() +
      Math.random().toString(36).slice(-8).toUpperCase()
  },
  fetchOnServer: true,
  methods: {
    inputProduct(product) {
      this.product = product
    },
    async createProduct() {
      await this.$store.dispatch('error/down')

      // ? Creating Product
      if (
        !this.product.info.title ||
        !this.product.billing.priceCC ||
        !this.product.info.description ||
        !this.product.code ||
        !this.product.info.image
      ) {
        this.$store.dispatch(
          'error/up',
          'Lütfen tüm gerekli alanları doldurduğunuzdan emin olun!'
        )
        return false
      }

      const productCreate = await this.$axios
        .post(
          '/product/create',
          {
            code: this.product.code,
            ...this.product.info,
            ...this.product.billing,
            shop: this.product.shop._id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.user.data?.token}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((err) => {
          return err
        })

      if (productCreate.status !== 200) {
        this.$store.dispatch(
          'error/up',
          productCreate?.error || 'Bilinmeyen bir hata meydana geldi!'
        )
        return false
      }

      this.$router.push({ name: 'dashboard-product' })
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-create {
  margin-top: 10px;
}
</style>