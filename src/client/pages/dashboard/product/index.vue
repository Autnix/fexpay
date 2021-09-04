<template>
  <div class="page-full">
    <h2 class="main-title">Ürünlerim</h2>
    <div class="sub">
      <span class="main-desc">Aktif Ürünlerim</span>
      <span class="main-desc link">
        <nuxt-link tag="a" :to="{ name: 'dashboard-product-create' }" href="#">
          <uil-plus-circle size="16" style="fill: var(--primary-color)" /> Yeni
          ürün ekle</nuxt-link
        >
      </span>
    </div>
    <div class="products">
      <div class="card card-responsive p-0">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Ürün Adı</th>
              <th>Kayıtlı Mağaza</th>
              <th>Ürün Linki</th>
              <th>Ürün Fiyatı</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="$fetchState.pending">
              <td colspan="6">
                <SkeletonTheme
                  color="var(--skeleton-color)"
                  highlight="var(--skeleton-highlight)"
                >
                  <div v-for="n in 3" :key="n" style="margin-bottom: 10px">
                    <Skeleton height="45px"></Skeleton>
                  </div>
                </SkeletonTheme>
              </td>
            </tr>
            <productListElement
              v-for="product in products"
              :key="product._id"
              :product="product"
            />
            <!-- <tr v-else-if="!$fetchState.error">
              <td class="w-zero">
                <img
                  src="https://cdn.datafex.com.tr/fgjC8t.jpg"
                  width="45px"
                  alt=""
                />
              </td>
              <td>Demo Ürün 1</td>
              <td>DataFEX</td>
              <td>
                <a href="fexpay.net/p/251199" target="_blank"
                  ><strong>fexpay.net/p/251199</strong></a
                >
              </td>
              <td>25,00 TL</td>
              <td></td>
            </tr> -->
          </tbody>
        </table>
      </div>
      <!-- <div class="card">
        <div class="card-header">
          <div>
            <h2 class="product-title">Örnek Ürün 1</h2>
            <small class="product-shop">DataFEX</small>
          </div>
          <h3 class="product-price">15,20 TL</h3>
        </div>
        <div class="card-body">
          <div class="product-image">
            <img src="https://cdn.datafex.com.tr/fgjC8t.jpg" alt="" />
          </div>
          <div class="product-info">
            <ul class="details-list">
              <li class="link">
                <a href="#"><strong>fexpay.net/p/251199</strong></a>
              </li>
              <li>
                <span>Oluşturulma Tarihi:</span> <strong>31.08.2021</strong>
              </li>
              <li><span>Durum:</span> <strong>Aktif</strong></li>
            </ul>
          </div>
          <div class="product-actions">
            <button class="button b-block b-bold">GÜNCELLE</button>
            <button class="button b-block b-bold b-secondary">SİL</button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { UilPlusCircle } from '@iconscout/vue-unicons'
import { Skeleton, SkeletonTheme } from 'vue-loading-skeleton'
import ProductListElement from '@/components/pages/product/productListElement'

export default {
  components: {
    UilPlusCircle,
    Skeleton,
    SkeletonTheme,
    ProductListElement,
  },
  data() {
    return {
      products: () => [],
    }
  },
  async fetch() {
    const { data } = await this.$axios
      .get('/product/get-all', {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.data?.token}`,
        },
      })
      .catch((e) => {
        this.$store.dispatch('error/up', 'Bir hata meydana geldi!')
      })

    this.products = data.products
  },
}
</script>

<style lang="scss" scoped>
.products {
  margin: 10px 0;
  // .card {
  //   margin-bottom: 10px;
  //   overflow: hidden;
  //   .card-header {
  //     background-color: rgba(var(--primary-color-rgb), 0.1);
  //     padding: 20px;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     .product-title {
  //       font-size: 18px;
  //       font-weight: 500;
  //     }
  //     .product-shop {
  //       font-weight: 400;
  //       opacity: 0.7;
  //     }
  //     .product-price {
  //       font-size: 20px;
  //       letter-spacing: 0.7px;
  //       opacity: 0.8;
  //     }
  //   }
  //   .card-body {
  //     padding: 20px;
  //     display: flex;
  //     .product-image {
  //       max-width: 104px;
  //       max-height: 104px;
  //       img {
  //         width: 100%;
  //         border-radius: 5px;
  //       }
  //     }
  //     .product-info {
  //       flex-grow: 1;
  //       ul.details-list {
  //         padding: 0 20px;
  //         li {
  //           font-size: 12px;
  //           margin-bottom: 5px;
  //           span {
  //             opacity: 0.8;
  //           }
  //           strong {
  //             font-weight: 600;
  //           }
  //           &.link {
  //             font-size: 14px;
  //             a strong {
  //               color: var(--primary-color) !important;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     .product-actions {
  //       width: 150px;
  //       min-width: 150px;
  //     }
  //   }
  // }
}
</style>