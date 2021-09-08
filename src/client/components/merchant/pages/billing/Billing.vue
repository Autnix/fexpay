<template>
  <div>
    <BillingMethods :methods="methods" :current-method="currentMethodId" />

    <BillingMethodsCreditCard
      v-if="currentMethodId === '6137f08fa699b754608e3f6f'"
      :product="product"
      :method="currentMethod"
      :customer-info="customerInfo"
      @page="$emit('page', $event)"
      @remove-order="$emit('remove-order')"
    />
  </div>
</template>

<script>
import BillingMethods from '@/components/merchant/pages/billing/BillingMethods.vue'
import BillingMethodsCreditCard from '@/components/merchant/pages/billing/methods/BillingMethodsCreditCard.vue'

export default {
  components: {
    BillingMethods,
    BillingMethodsCreditCard,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
    customerInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      methods: [],
      currentMethod: null,
    }
  },
  async fetch() {
    const data = await this.$axios
      .post('/merchant/get-methods', {
        declineMethods: this.product.owner.declineMethods,
      })
      .then((res) => res.data)

    this.methods = data.methods
    this.currentMethod = data.methods[0] || null
  },
  computed: {
    currentMethodId() {
      return this.currentMethod?._id || null
    },
  },
}
</script>
