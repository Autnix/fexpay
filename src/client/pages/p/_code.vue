<template>
  <div class="merchant-container">
    <ProductInfo
      v-if="!$fetchState.pending && !$fetchState.error"
      :product="product"
    />
    <OrderInteractive :product="product" />
  </div>
</template>


<script>
import ProductInfo from '@/components/merchant/ProductInfo.vue'
import OrderInteractive from '@/components/merchant/OrderInteractive.vue'

export default {
  components: {
    ProductInfo,
    OrderInteractive,
  },
  layout: 'merchant',
  data() {
    return {
      product: null,
    }
  },
  async fetch() {
    const code = this.$route.params.code

    const data = await this.$axios
      .post('/merchant/get-product', { code })
      .then((res) => res.data)
      .catch((err) => err.response.data)

    if (!data || data.status !== 200) {
      const ErrorDetails = data.error || 'Bilinmeyen bir hata meydana geldi!'
      await this.$store.dispatch('error/up', ErrorDetails)
      throw new Error(ErrorDetails)
    }

    this.product = data.product
  },
}
</script>