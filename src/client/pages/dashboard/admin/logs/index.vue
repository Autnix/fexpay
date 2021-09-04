<template>
  <div class="page-full">
    <AdminTopbar :active="2" />
    <h2 class="main-title">Site Kayıtları</h2>
    <div class="sub">
      <span class="main-desc"
        >Son <strong>300</strong> kaydı burada görüntüleyebilirsiniz
      </span>
      <span class="main-desc link">
        <a
          class="badge badge-primary"
          style="padding: 5px 10px"
          href="#"
          @click="$fetch"
        >
          <uil-redo size="16" style="fill: var(--light)" /> Kayıtları Yenile</a
        >
      </span>
    </div>
    <div class="card card-responsive p-0">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Log ID</th>
            <th>Log Sahibi</th>
            <th>Komut</th>
            <th>Açıklama</th>
            <th>İstek Durumu</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="$fetchState.pending">
            <td colspan="7">
              <SkeletonTheme
                color="var(--skeleton-color)"
                highlight="var(--skeleton-highlight)"
              >
                <div v-for="n in 5" :key="n" style="margin-bottom: 10px">
                  <Skeleton
                    height="28px"
                    :width="`${getRandomInt(60, 100)}%`"
                  ></Skeleton>
                </div>
              </SkeletonTheme>
            </td>
          </tr>
          <tr v-for="log in logs" v-else-if="!$fetchState.error" :key="log._id">
            <td class="action">
              <span>
                <a href="#">
                  <uil-file-search-alt size="20" />
                </a>
              </span>
            </td>
            <td>
              <span>{{ log._id.slice(-6) }}</span>
            </td>
            <td>
              <span
                ><strong>{{ log.owner.info.fullname }}</strong></span
              >
            </td>
            <td>
              <span>{{ log.command }}</span>
            </td>
            <td>
              <span>{{ log.title }}</span>
            </td>
            <td class="status">
              <span v-if="log.status === 0" class="badge badge-primary"
                >İŞLENİYOR</span
              >
              <span v-else-if="log.status === 1" class="badge badge-success"
                >BAŞARILI</span
              >
              <span v-else class="badge badge-danger">BAŞARISIZ</span>
            </td>
            <td>
              <span>{{ getMoment(log.createAt) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Skeleton, SkeletonTheme } from 'vue-loading-skeleton'
import { UilFileSearchAlt, UilRedo } from '@iconscout/vue-unicons'
import AdminTopbar from '@/components/admin/adminTopbar'

export default {
  components: {
    AdminTopbar,
    Skeleton,
    SkeletonTheme,
    UilFileSearchAlt,
    UilRedo,
  },
  middleware: ['admin'],
  data() {
    return {
      logs: [],
    }
  },
  async fetch() {
    const { data } = await this.$axios
      .get('/admin/logs/list', {
        headers: {
          Authorization: `Bearer ${this.$store.state.user.data?.token}`,
        },
      })
      .catch((e) => ({ data: false }))

    if (!data) {
      await this.$store.dispatch(
        'error/up',
        'Veritabanı bağlantısında bir problem meydana geldi. Daha sonra tekrar deneyin.'
      )
      return false
    }

    this.logs = data.logs
  },
  fetchOnServer: false,
  beforeMount() {
    moment.locale('tr')
  },
  methods: {
    getMoment(date) {
      return moment(date).fromNow()
    },
    getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min) + min)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: 10px;
  table {
    width: 100%;
    td {
      font-size: 12px !important;
      &.action {
        width: 0;
        a {
          opacity: 0.7;
          transition: 200ms opacity;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
    th {
      font-size: 14px !important;
    }
  }
}
.badge {
  padding: 2px 5px;
  border-radius: 3px;
  &.badge-success {
    background-color: var(--b-color-success);
    color: var(--light);
  }
  &.badge-danger {
    background-color: var(--b-color-danger);
    color: var(--light);
  }
  &.badge-primary {
    background-color: var(--b-color-primary);
    color: var(--light);
  }
}
</style>
