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
    <div class="shop-create">
      <div class="card">
        <div class="card-title">
          <h4>ÜRÜN KODU</h4>
        </div>
        <div class="i-group i-collapse collapse-inline product-code">
          <input :value="product.code" type="text" class="f-control" disabled />
          <div class="group-icon">
            <span> fexpay.net/p/ </span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          <h4>FİYAT BİLGİ</h4>
        </div>
        <div class="flexible">
          <div class="col">
            <div class="f-group">
              <label>Ürünün Fiyatı</label>
            </div>
            <div class="i-group i-collapse">
              <input
                v-model="product.price"
                type="number"
                class="f-control"
                min="1"
                @change="inputPrice"
              />
              <div class="group-icon">
                <span> ₺ </span>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="f-group">
              <label>Tahmini Kazanç</label>
            </div>
            <div class="i-group i-collapse">
              <input
                :value="gain"
                type="number"
                class="f-control"
                min="1"
                disabled
              />
              <div class="group-icon">
                <span> ₺ </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          <h4>GENEL BİLGİ</h4>
        </div>
        <form>
          <div class="f-group">
            <label>Kayıtlı Proje</label>
            <input type="text" class="f-control" :value="shopName" disabled />
            <small>Kayıtlı proje değiştirilemez</small>
          </div>
          <div class="f-group">
            <label>Ürün İsmi</label>
            <input v-model="product.title" type="text" class="f-control" />
          </div>
          <div class="f-group">
            <label>Ürün Açıklaması</label>
            <textarea
              v-model="product.description"
              class="f-control"
            ></textarea>
          </div>
          <div class="f-group">
            <label>Ürün Görseli</label>
            <Dropzone :options="options" @vdropzone-success="fileSuccess" />
            <small
              >Yüklenebilecek maksimum dosya boyutu: <strong>1MB</strong>.
              <a href="#">Daha büyük dosyalar için tıklayın!</a></small
            >
          </div>
        </form>
      </div>
      <button class="button b-block b-bold" @click.prevent="createProduct()">
        Ürünü listele
      </button>
    </div>
  </div>
</template>

<script>
import Dropzone from '@/components/elements/dropzone'
export default {
  components: {
    Dropzone,
  },
  data() {
    return {
      options: {
        maxFiles: 2,
        maxFilesize: 1,
        acceptedFiles: 'image/*',
      },
      product: {
        code: null,
        price: Number(1).toFixed(2),
        title: null,
        description: null,
        image: null,
        shop: this.$route.params.shop_id,
      },
      shopName: null,
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

    this.shopName = data.shop?.info?.name
    this.product.code =
      Math.random().toString(36).slice(-8).toUpperCase() +
      Math.random().toString(36).slice(-8).toUpperCase()
  },
  fetchOnServer: true,
  computed: {
    gain() {
      return Number(
        this.product.price -
          this.product.price * this.$store.state.user.data.interests.creditCard
      ).toFixed(2)
    },
  },
  methods: {
    async createProduct() {
      // ? Creating Product
      if (
        !this.product.title ||
        !this.product.price ||
        !this.product.description ||
        !this.product.code ||
        !this.product.image
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
          { ...this.product, priceCC: this.product.price },
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
    async fileSuccess(file) {
      const formData = new FormData()
      formData.append('files', file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await this.$axios
        .post(`${process.env.CDN_URI}/upload/product`, formData, config)
        .catch((e) => {
          console.error(e)
          return { data: false }
        })

      if (!data) {
        return this.$store.dispatch(
          'error/up',
          'Dosya yüklenirken bir hata meydana geldi. Lütfen daha sonra tekrar deneyin!'
        )
      }

      this.product.image = data.path
    },
    inputPrice() {
      if (this.product.price < 1) this.product.price = 1

      this.product.price = Number(this.product.price).toFixed(2)
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-create {
  margin-top: 10px;
  .card {
    margin-bottom: 10px;
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