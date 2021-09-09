<template>
  <div class="component-area">
    <CustomerInformation
      v-if="page === 0"
      :customer-info="customerInfo"
      :product="product"
      @input="inputCustomerInfo"
      @page="setPage"
      @set-order-id="setOrderId"
    />
    <Billing
      v-else-if="page === 1"
      :product="product"
      :customer-info="customerInfo"
      @page="setPage"
      @remove-order="removeOrder"
    />
  </div>
</template>

<script>
import CustomerInformation from '@/components/merchant/pages/CustomerInformation.vue'
import Billing from '@/components/merchant/pages/billing/Billing.vue'

export default {
  components: {
    CustomerInformation,
    Billing,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      page: 0,
      customerInfo: {
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        check: false,
        orderId: null,
      },
    }
  },
  methods: {
    inputCustomerInfo(info) {
      this.customerInfo = info
    },
    setPage(page) {
      if (page > 0 && !this.customerInfo.orderId) {
        this.$store.dispatch(
          'error/up',
          'Sipariş henüz oluşturulamadı veya bilinmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyin!'
        )
        return false
      }
      this.page = page
    },
    setOrderId(id) {
      this.customerInfo.orderId = id
    },
    async removeOrder() {
      await this.$axios
        .post('/merchant/remove-order', { orderId: this.customerInfo.orderId })
        .then((res) => res.data)
        .catch((e) => false)

      this.orderId = null
      this.page = 0
    },
  },
}
</script>