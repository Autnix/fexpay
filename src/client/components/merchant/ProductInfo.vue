<template>
  <div class="product-info f-1">
    <div class="shop">
      <div class="shop-icon shadow-init">
        <uil-shop size="18px" style="margin-bottom: 1px" />
      </div>
      <h3 class="shop-title">{{ product.shopId.info.name }}</h3>
    </div>
    <div class="price">
      <div class="sub-title">Sipariş tutarı</div>
      <div class="price-init">
        <span>₺ {{ product.billing.priceCC.toFixed(2) }}</span>
      </div>
    </div>
    <div class="shop-subtitle">
      <span>ÜRÜN DETAYLARI</span>
    </div>
    <div class="product-area">
      <ul class="products">
        <li>
          <img
            src="https://cdn.datafex.com.tr/fgjC8t.jpg"
            alt=""
            class="product-img"
          />
          <div class="product-details">
            <h4>{{ product.info.title }}</h4>
            <small> <uil-tag-alt size="14px" /> Tek seferlik ödeme </small>
          </div>
          <div class="product-price">
            <h5>₺ {{ product.billing.priceCC.toFixed(2) }}</h5>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { UilShop, UilTagAlt } from '@iconscout/vue-unicons'

export default {
  components: {
    UilShop,
    UilTagAlt,
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
.product-info {
  margin-right: 25px;
  --color: rgba(0, 0, 0, 0.4);
  .shop {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    .shop-icon {
      width: 40px;
      height: 40px;
      background-color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
    .shop-title {
      font-weight: 400;
      font-size: 22px;
    }
  }
  .shop-subtitle {
    margin-top: 2rem;
    font-size: 12px;
    display: flex;
    align-items: center;
    span {
      width: fit-content;
      min-width: max-content;
      font-weight: 600;
      color: var(--color);
    }
    &::after {
      content: '';
      border-top-width: 1px;
      border-top-style: solid;
      border-top-color: var(--color);
      width: 100%;
      flex-grow: 1;
      margin-left: 15px;
    }
  }
  .price {
    .sub-title {
      font-size: 12px;
      font-weight: 500;
      opacity: 0.7;
    }
    .price-init {
      font-size: 36px;
      font-weight: 600;
      line-height: 36px;
    }
  }
  .product-area {
    margin-top: 1rem;
    .products {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        min-height: 25px; // ! delete it
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.4);
        padding: 10px;
        align-items: center;
        .product-img {
          height: 45px;
          border-radius: 5px;
          margin-right: 10px;
        }
        .product-details {
          flex-grow: 1;
          h4 {
            font-weight: 500;
            font-size: 18px;
          }
          small {
            font-size: 12px;
            opacity: 0.8;
            display: flex;
            align-items: center;
          }
        }
        .product-price {
          h5 {
            opacity: 0.7;
            font-weight: 400;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>

