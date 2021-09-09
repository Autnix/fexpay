<template>
  <form class="method-credit-card customer-info">
    <div class="card-info">
      <h5 class="title merchant-subtitle">Alıcı Bilgileri</h5>
      <div class="customer-name form-area">
        <input
          v-model="cloneCustomerInfo.firstname"
          class="input f-control"
          type="text"
          placeholder="Adınız"
          required
          @input="$emit('input', cloneCustomerInfo)"
        />
        <input
          v-model="cloneCustomerInfo.lastname"
          class="input f-control"
          type="text"
          placeholder="Soyadınız"
          required
          @input="$emit('input', cloneCustomerInfo)"
        />
      </div>
      <div class="customer-mail form-area">
        <input
          v-model="cloneCustomerInfo.email"
          class="input f-control"
          type="text"
          placeholder="Eposta adresiniz"
          required
          @input="$emit('input', cloneCustomerInfo)"
        />
      </div>
      <div class="customer-phone form-area">
        <input
          v-model="cloneCustomerInfo.phone"
          class="input f-control"
          type="text"
          placeholder="Telefon Numaranız"
          required
          @input="$emit('input', cloneCustomerInfo)"
        />
      </div>
      <div class="customer-check form-area">
        <label>
          <input
            v-model="cloneCustomerInfo.check"
            type="checkbox"
            @change="$emit('input', cloneCustomerInfo)"
          />
          <span>
            <a href="#">Mesafeli satış sözleşmesi</a> ve
            <a href="#">Gizlilik Politikası</a>'nı okudum ve kabul ediyorum.
          </span>
        </label>
      </div>
    </div>

    <button
      class="button b-secondary b-block b-with-cc"
      :class="{ 'b-loading': loading }"
      :disabled="loading"
      @click.prevent="go"
    >
      DEVAM ET
    </button>
  </form>
</template>

<script>
export default {
  props: {
    customerInfo: {
      type: Object,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cloneCustomerInfo: () => ({}),
      loading: false,
    }
  },
  beforeMount() {
    this.cloneCustomerInfo = this.customerInfo
  },
  methods: {
    async go() {
      await this.$store.dispatch('error/down')
      this.loading = true

      if (
        !this.customerInfo.firstname ||
        !this.customerInfo.lastname ||
        !this.customerInfo.email ||
        !this.customerInfo.phone
      ) {
        await this.$store.dispatch(
          'error/up',
          'Lütfen tüm alanları doldurun ve tekrar deneyin!'
        )
        this.loading = false
        return false
      }

      if (!this.customerInfo.check) {
        await this.$store.dispatch(
          'error/up',
          'Lütfen mesafeli satış sözleşmesi ve kullanım koşullarını kabul edin!'
        )
        this.loading = false
        return false
      }

      const data = await this.$axios
        .post('/merchant/create-order', {
          ...this.customerInfo,
          productId: this.product._id,
        })
        .then((res) => res.data)
        .catch((err) => err.response.data)

      if (!data || data.status !== 200) {
        const ErrorDetails = data.error || 'Bilinmeyen bir hata meydana geldi!'
        await this.$store.dispatch('error/up', ErrorDetails)
        this.loading = false
        return false
      }

      this.$emit('set-order-id', data.orderId)
      this.$emit('page', 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.customer-info {
  input {
    margin: 0;
  }
  .form-area {
    margin: 10px 0;
  }
  .customer-name {
    display: flex;
    justify-content: space-between;
    input {
      width: calc(50% - 3px);
    }
  }
  .customer-check {
    label {
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        a {
          color: var(--b-color-primary);
        }
      }
      input[type='checkbox'] {
        --width: 18px;
        all: unset;
        width: var(--width);
        min-width: var(--width);
        height: var(--width);
        background-color: rgba(black, 0.05) !important;
        border-radius: 50%;
        margin-right: 5px;
        border: 1px solid rgba(black, 0.3);
        cursor: pointer;
        &:checked {
          position: relative;
          height: var(--width);
          width: var(--width);
          min-width: var(--width);
          border-color: var(--b-color-primary);
          background-color: white !important;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(var(--width) / 2);
            min-width: calc(var(--width) / 2);
            height: calc(var(--width) / 2);
            border-radius: 50%;
            background-color: var(--b-color-primary);
          }
        }
      }
    }
  }
}
</style>