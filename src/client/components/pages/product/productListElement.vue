<template>
  <tr>
    <td class="w-zero">
      <img
        :src="`/uploads/product-images/${product.info.image}`"
        width="45px"
        alt=""
      />
    </td>
    <td>{{ product.info.title }}</td>
    <td>DataFEX</td>
    <td>
      <a :href="`fexpay.net/p/${product.code}`" target="_blank"
        ><strong>{{ `fexpay.net/p/${product.code}` }}</strong></a
      >
    </td>
    <td>{{ product.billing.priceCC.toFixed(2) }} ₺</td>
    <td></td>
  </tr>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    product: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>