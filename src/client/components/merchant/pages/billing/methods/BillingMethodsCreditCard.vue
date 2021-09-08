<template>
  <form class="method-credit-card">
    <div class="card-info">
      <h5 class="title merchant-subtitle">Kart Bilgileri</h5>
      <div class="card-number-input">
        <input
          ref="cardNumber"
          v-model="cardInfo.cardNumber"
          class="input f-control"
          type="text"
          placeholder="1234 1234 1234 1234"
          required
        />
        <div v-if="cardNumberInfo.card" class="card-brand">
          <img :src="cardBrandLogo" height="15px" draggable="false" alt="" />
        </div>
      </div>
      <div class="card-details">
        <input
          ref="cardExp"
          v-model="cardInfo.cardExp"
          class="input f-control"
          type="text"
          required
          placeholder="AA / YY"
        />

        <input
          ref="cardCvc"
          v-model="cardInfo.cardCvc"
          class="input f-control"
          type="number"
          required
          placeholder="CVC"
        />
      </div>
      <div class="card-owner-name">
        <input
          ref="cardOwnerName"
          v-model="cardInfo.cardHoldname"
          class="input f-control"
          type="text"
          required
          placeholder="Kart Sahibinin Adı Soyadı"
        />
      </div>
      <div class="brands">
        <img
          src="~/assets/img/cardbrandsall/default.svg"
          height="35px"
          alt=""
        />
      </div>
    </div>

    <div class="confirm">
      <button
        class="button b-secondary b-block b-with-cc"
        :class="{ 'b-loading': loading }"
        :disabled="loading"
        @click.prevent="cardValidate"
      >
        HEMEN ÖDE <strong>₺{{ product.billing.priceCC.toFixed(2) }}</strong>
      </button>
      <small class="confirm-small">
        Bilgilerini düzeltmek mi istiyorsun?
        <a href="#" @click.prevent="$emit('remove-order')">Geri dön!</a>
      </small>
    </div>
  </form>
</template>

<script>
import Valid from 'card-validator'
import Payment from 'payment'

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    method: {
      type: Object,
      required: true,
    },
    customerInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cardInfo: {
        cardNumber: null,
        cardExp: null,
        cardCvc: null,
        cardHoldname: null,
      },
      loading: false,
    }
  },
  computed: {
    cardNumberInfo() {
      return Valid.number(this.cardInfo.cardNumber)
    },
    cardBrandLogo() {
      return require(`~/assets/img/cardbrandsall/${this.cardNumberInfo.card.type.replace(
        ' ',
        ''
      )}.svg`)
    },
    cardExpMonth() {
      const expArr = this.cardInfo.cardExp.replaceAll(' ', '').split('/')
      return expArr[0].slice(-2)
    },
    cardExpYear() {
      const expArr = this.cardInfo.cardExp.replaceAll(' ', '').split('/')
      return expArr[1].slice(-2)
    },
  },
  mounted() {
    Payment.formatCardNumber(this.$refs.cardNumber, 16)
    Payment.formatCardExpiry(this.$refs.cardExp)
    Payment.formatCardCVC(this.$refs.cardCvc)
  },
  methods: {
    async cardValidate() {
      console.log('product', this.product)
      console.log('method', this.product)
      console.log('customerInfo', this.customerInfo)
      console.log('cardInfo', this.cardInfo)

      // ? Reset Request

      await this.$store.dispatch('error/down')
      this.loading = true

      // ? Card Validate Definitions

      const validateNumber = Valid.number(this.cardInfo.cardNumber)
      const validateExpiry = Valid.expirationDate(this.cardInfo.cardExp)
      const validateCVC = Valid.cvv(this.cardInfo.cardCvc)
      const validateHoldername = Valid.cardholderName(
        this.cardInfo.cardHoldname
      )

      // ? Card Validation

      if (!validateNumber.isValid) {
        await this.$store.dispatch(
          'error/up',
          'Kart numaranız hatalı. Lütfen doğru formatta girdiğinizden emin olun.'
        )
        this.loading = false
        return false
      }

      if (!validateExpiry.isValid) {
        await this.$store.dispatch(
          'error/up',
          'Kartınızın son kullanma tarihi hatalı veya tarihi geçmiş. Lütfen doğru formatta girdiğinizden emin olun.'
        )
        this.loading = false

        return false
      }

      if (!validateCVC.isValid) {
        await this.$store.dispatch(
          'error/up',
          'CVC/CVV kodunuz hatalı. Lütfen doğru formatta girdiğinizden emin olun.'
        )
        this.loading = false

        return false
      }

      if (!validateHoldername.isValid) {
        await this.$store.dispatch(
          'error/up',
          'Kart sahibinin adını doğru girdiğinizden emin olun.'
        )
        this.loading = false

        return false
      }

      // * IF Card is valid!

      console.warn('CARD VALID')

      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.card-info {
  display: flex;
  flex-direction: column;
  margin: 25px 0;
  h5 {
    margin-bottom: 10px;
  }
  input {
    margin: 0 !important;
  }
  .card-number-input {
    position: relative;
    input {
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      border-bottom: 0;
    }
    .card-brand {
      display: flex;
      align-items: center;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .card-details {
    display: flex;
    input {
      flex: 1;
      border-radius: 0;
      &:first-child {
        border-right: 0;
      }
    }
  }

  .card-owner-name {
    input {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 0;
    }
  }
  .brands {
    display: flex;
    justify-content: flex-end;
  }
}
.confirm {
  button {
    margin-bottom: 0;
  }
  small.confirm-small {
    font-size: 12px;
    a {
      color: var(--b-color-primary);
    }
  }
}
</style>