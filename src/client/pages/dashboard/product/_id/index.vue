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
        <button
          class="button b-primary b-bold b-block"
          @click.prevent="updateProduct()"
        >
          ÜRÜNÜ GÜNCELLE
        </button>
      </div>
      <div v-if="$fetchState.pending"></div>
      <div v-else-if="!$fetchState.error" class="card card-wrap">
        <div class="card-title">
          <h4>ÜRÜN ÖNİZLEME</h4>
        </div>
        <div class="card-body showroom">
          <div class="product-card">
            <div class="shw-image">
              <div class="image-area">
                <img
                  :src="`/uploads/product-images/${product.info.image}`"
                  alt=""
                />
              </div>
            </div>
            <div class="shw-title">
              <h4>{{ product.info.title }}</h4>
            </div>
            <div class="shw-price">
              <h5>{{ Number(product.billing.priceCC).toFixed(2) }} ₺</h5>
            </div>
            <div class="desc-title">
              <h6>Açıklama</h6>
            </div>
            <div class="shw-description">
              <div class="desc-area">
                <p>
                  {{ product.info.description }}
                </p>
              </div>
            </div>
          </div>
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
    async updateProduct() {
      const productUpdate = await this.$axios
        .post(
          '/product/update',
          {
            product: this.product,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.user.data?.token}`,
            },
          }
        )
        .then((res) => res.data)
        .catch((e) => false)

      if (productUpdate.status !== 200) {
        this.$store.dispatch(
          'error/up',
          productUpdate?.error || 'Bilinmeyen bir hata meydana geldi!'
        )
        return false
      }

      this.$router.push({ name: 'dashboard-product' })
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
    .card-body.showroom {
      display: flex;
      justify-content: center;
      height: 100%;
      .product-card {
        width: 100%;
        background-color: rgba(var(--light-rgb), 0.4);
        border: 1px solid rgba(#eee, 0.4);
        padding: 30px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        margin: 0 30px;
        margin-bottom: auto;
        margin-top: 30px;
        .shw-image {
          display: flex;
          width: 100%;
          justify-content: center;
          .image-area {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(white, 0.2);
            img {
              width: 100%;
              border-radius: 5px;
            }
          }
        }
        .shw-title {
          display: flex;
          justify-content: center;
          margin-top: 20px;
          h4 {
            font-size: 24px;
          }
        }
        .shw-price {
          display: flex;
          justify-content: center;
          h5 {
            font-weight: 400;
            font-size: 16px;
          }
        }
        .desc-title {
          margin-top: 20px;
          h6 {
            font-size: 14px;
            font-weight: 500;
          }
        }
        .shw-description {
          display: flex;
          margin-top: 5px;
          background-color: rgba(var(--light-rgb), 0.8);
          border: 1px solid rgba(var(--dark-rgb), 0.3);
          padding: 10px;
          border-radius: 5px;
          p {
            font-family: 'Inconsolata', monospace;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>