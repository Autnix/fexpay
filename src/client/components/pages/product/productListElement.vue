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
    <td class="edit">
      <nuxt-link tag="a" :to="'/dashboard/product/' + product._id" href="#">
        <uil-edit size="20" />
      </nuxt-link>
    </td>
  </tr>
</template>

<script>
import { UilEdit } from '@iconscout/vue-unicons'
export default {
  components: {
    UilEdit,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.edit {
  a {
    opacity: 0.8;
    transition: 200ms opacity;
    &:hover {
      opacity: 1;
    }
    svg {
      fill: var(--primary-color);
    }
  }
}
</style>