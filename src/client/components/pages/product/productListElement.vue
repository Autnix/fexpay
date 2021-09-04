<template>
  <tr>
    <td class="w-zero">
      <span>
        <img
          :src="`/uploads/product-images/${product.info.image}`"
          width="45px"
          alt=""
        />
      </span>
    </td>
    <td>
      <span>{{ product.info.title }}</span>
    </td>
    <td><span>%shop_name%</span></td>
    <td>
      <span
        ><a :href="`fexpay.net/p/${product.code}`" target="_blank"
          ><strong>{{ `fexpay.net/p/${product.code}` }}</strong></a
        ></span
      >
    </td>
    <td>
      <span>{{ product.billing.priceCC.toFixed(2) }} ₺</span>
    </td>
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