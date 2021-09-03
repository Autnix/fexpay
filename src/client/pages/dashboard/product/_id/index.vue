<template>
  <div class="page-full">
    <h2 class="main-title">Ürünü Düzenle</h2>
    <div class="sub">
      <span class="main-desc">Ürünü Düzenle</span>
      <span class="main-desc link">
        <nuxt-link tag="a" :to="{ name: 'dashboard-product' }" href="#">
          Ürünlerimi görüntüle</nuxt-link
        >
      </span>
    </div>
    <div class="product-edit">
      <div v-if="$fetchState.pending"></div>
      <div v-else-if="!$fetchState.error" class="edit-area card-wrap">
        <ProductForm :product="product" @inputProduct="inputProduct" />
      </div>
      <div class="card card-wrap">
        <div class="card-title">
          <h4>ÜRÜN ÖNİZLEME</h4>
        </div>
      </div>
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
      product: null,
    }
  },
  async fetch() {
    const data = await this.$axios
      .post(
        '/product/get',
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
      this.$router.push({ name: 'dashboard-product' })
      throw new Error(error)
    }

    this.product = { ...data.product }
  },
  // fetchOnServer: false,
  methods: {
    inputProduct(product) {
      this.product = product
    },
  },
}
</script>

<style lang="scss" scoped>
.sub {
  margin-bottom: 10px;
}
.product-edit {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card-wrap {
    width: calc(50% - 7px);
  }
  .card {
    margin-bottom: 14px;
    .product-code {
      input {
        padding-left: 135px !important;
      }
    }
    .flexible {
      display: flex;
      .col {
        flex: 1;
        margin: 0 5px;
        &:first-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>