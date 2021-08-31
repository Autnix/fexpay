<template>
  <div class="page-container">
    <h2 class="main-title">Yeni Mağaza Oluştur</h2>
    <div class="sub">
      <span class="main-desc">Yeni bir mağaza oluştur</span>
      <span class="main-desc link">
        <nuxt-link tag="a" :to="{ name: 'dashboard-shop' }" href="#">
          Mağazalarımı görüntüle</nuxt-link
        >
      </span>
    </div>
    <div class="shop-create">
      <div class="card">
        <form>
          <div class="f-group">
            <label>Mağazanın Adı</label>
            <input
              v-model="shop.name"
              type="text"
              class="f-control"
              placeholder="Yeni mağazanıza bir isim verin"
            />
          </div>
          <div class="f-group">
            <label>Mağazanın Websitesi</label>
            <input
              v-model="shop.website"
              type="text"
              class="f-control"
              placeholder="Ürünlerinizi sunacağınız web sayfasını bizimle paylaşın"
            />
            <small
              >Bir websiteniz bulunmuyorsa https://fexpay.net/shop/proje-adi
              girebilirsiniz</small
            >
          </div>
          <div class="f-group">
            <label>Mağazanın Logosu</label>
            <Dropzone :options="options" @vdropzone-success="fileSuccess" />
            <small
              >Yüklenebilecek maksimum dosya boyutu: <strong>1MB</strong>.
              <a href="#">Daha büyük dosyalar için tıklayın!</a></small
            >
          </div>
          <button class="button b-block" @click.prevent="createShop()">
            Yeni mağazanı oluştur
          </button>
        </form>
      </div>
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
      shop: {
        name: null,
        website: null,
        logo: null,
      },
    }
  },
  methods: {
    async createShop() {
      if (!this.shop.name || !this.shop.website) {
        this.$store.dispatch(
          'error/up',
          'Lütfen tüm gerekli alanları doldurduğunuzdan emin olun!'
        )
        return false
      }

      const shopCreate = await this.$axios
        .post('/shop/create', this.shop, {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.data?.token}`,
          },
        })
        .then((res) => res.data)
        .catch((err) => {
          return err
        })

      if (shopCreate.status !== 200) {
        this.$store.dispatch(
          'error/up',
          shopCreate?.error || 'Bilinmeyen bir hata meydana geldi!'
        )
        return false
      }

      this.$router.push({ name: 'dashboard-shop' })
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
        .post(`${process.env.CDN_URI}/upload/shop`, formData, config)
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

      this.shop.logo = data.path
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-create {
  margin-top: 10px;
}
</style>