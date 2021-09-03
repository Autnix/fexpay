<template>
  <div class="product-code">
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
              v-model="localProduct.billing.priceCC"
              type="number"
              class="f-control"
              min="1"
              @change="inputPrice"
              @input="inputProduct"
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
          <input
            type="text"
            class="f-control"
            :value="product.shop.info.name"
            disabled
          />
          <small>Kayıtlı proje değiştirilemez</small>
        </div>
        <div class="f-group">
          <label>Ürün İsmi</label>
          <input
            v-model="localProduct.info.title"
            type="text"
            class="f-control"
            @input="inputProduct"
          />
        </div>
        <div class="f-group">
          <label>Ürün Açıklaması</label>
          <textarea
            v-model="localProduct.info.description"
            class="f-control"
            @input="inputProduct"
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
  </div>
</template>

<script>
import Dropzone from '@/components/elements/dropzone'
export default {
  components: {
    Dropzone,
  },
  props: {
    product: {
      type: Object,
      require: true,
      default: () => ({
        code: null,
        billing: {
          priceCC: Number(1).toFixed(2),
        },
        info: {
          title: null,
          description: null,
          image: null,
        },
        shop: null,
      }),
    },
  },
  data() {
    return {
      options: {
        maxFiles: 2,
        maxFilesize: 1,
        acceptedFiles: 'image/*',
      },
      localProduct: null,
    }
  },
  computed: {
    gain() {
      return Number(
        this.localProduct.billing.priceCC -
          this.localProduct.billing.priceCC *
            this.$store.state.user.data.interests.creditCard
      ).toFixed(2)
    },
  },
  created() {
    this.localProduct = { ...this.product }
  },
  methods: {
    inputProduct() {
      this.$emit('inputProduct', this.localProduct)
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

      this.localProduct.info.image = data.path

      this.$emit('inputProduct', this.localProduct)
    },
    inputPrice() {
      if (this.localProduct.billing.priceCC < 1)
        this.localProduct.billing.priceCC = 1

      this.localProduct.billing.priceCC = Number(
        this.localProduct.billing.priceCC
      ).toFixed(2)

      this.$emit('inputProduct', this.localProduct)
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>