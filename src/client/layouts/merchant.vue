<template>
  <div class="index">
    <div class="main light">
      <div class="content merchant-content">
        <div class="merchant-container">
          <div class="product-info f-1">
            <div class="shop">
              <div class="shop-icon shadow-init">
                <uil-shop size="18px" style="margin-bottom: 1px" />
              </div>
              <h3 class="shop-title">FivemTurk Forum</h3>
            </div>
            <div class="price">
              <div class="sub-title">Sipariş tutarı</div>
              <div class="price-init">
                <span>₺ 25.00</span>
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
                    <h4>FexPay Premium</h4>
                    <small>
                      <uil-tag-alt size="14px" /> Tek seferlik ödeme
                    </small>
                  </div>
                  <div class="product-price">
                    <h5>₺25,00</h5>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="interactive-area f-1">
            <div class="card shadow-init">
              <button
                v-if="!isLogin"
                class="button b-primary b-block b-with-fexpay"
              >
                <img
                  src="~/assets/img/logo/fexpay-light.svg"
                  height="25px"
                  alt=""
                />
                <span>FEXPAY HESABIN İLE ÖDE</span>
              </button>

              <div v-else class="logged-in">
                <div class="logged-avatar">
                  <img :src="getUserAvatar" height="45px" alt="" />
                </div>
                <div class="logged-content"></div>
              </div>

              <div class="or">
                <small>YA DA</small>
              </div>

              <div class="component-area" style="margin: 15px 0">
                <h5 class="title merchant-title">Bir ödeme yöntemi seç</h5>
                <ul class="methods">
                  <li class="active">
                    <div class="method-icon">
                      <uil-credit-card size="25px" />
                    </div>
                    <div class="method-title">Kart İle Ödeme</div>
                  </li>
                  <li>
                    <div class="method-icon">
                      <uil-university size="25px" />
                    </div>
                    <div class="method-title">EFT/Havale İle Ödeme</div>
                  </li>
                  <li>
                    <div class="method-icon">
                      <uil-paypal size="25px" />
                    </div>
                    <div class="method-title">Papara İle Ödeme</div>
                  </li>
                </ul>

                <form class="method-credit-card">
                  <div class="card-info">
                    <h5 class="title merchant-subtitle">Kart Bilgileri</h5>
                    <div class="card-number-input">
                      <input
                        ref="cardNumber"
                        v-model="test"
                        class="input f-control"
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        required
                        @input="cardValidate()"
                      />
                      <div v-if="cardInfo.card" class="card-brand">
                        <img
                          :src="cardBrandLogo"
                          height="15px"
                          draggable="false"
                          alt=""
                        />
                      </div>
                    </div>
                    <div class="card-details">
                      <input
                        ref="cardExp"
                        class="input f-control"
                        type="text"
                        required
                        placeholder="AA / YY"
                      />

                      <input
                        ref="cardCvc"
                        class="input f-control"
                        type="number"
                        required
                        placeholder="CVC"
                      />
                    </div>
                    <div class="card-owner-name">
                      <input
                        ref="cardOwnerName"
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

                  <button class="button b-secondary b-block b-with-cc">
                    HEMEN ÖDE <strong>₺25.00</strong>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="card"></div> -->
        <Nuxt />
      </div>
    </div>
  </div>
</template>


<script>
import {
  UilShop,
  UilCreditCard,
  UilUniversity,
  UilPaypal,
  UilTagAlt,
} from "@iconscout/vue-unicons";
import Valid from "card-validator";
import Payment from "payment";

export default {
  components: {
    UilShop,
    UilCreditCard,
    UilUniversity,
    UilPaypal,
    UilTagAlt,
  },
  data() {
    return {
      test: null,
    };
  },
  computed: {
    cardInfo() {
      return Valid.number(this.test);
      // Valid.number(this.test)
    },
    cardBrandLogo() {
      return require(`~/assets/img/cardbrandsall/${this.cardInfo.card.type.replace(
        " ",
        ""
      )}.svg`);
    },
    isLogin() {
      return this.$store.state.user.authenticated;
    },
    getUserAvatar() {
      return this.getUser.info.defaultAvatar
        ? `https://avatars.dicebear.com/api/initials/${this.getUser.info.fullname}.svg?background=%23274AD2`
        : this.getUser.info.avatarUrl;
    },
    getUser() {
      return this.$store.state.user.data;
    },
  },
  mounted() {
    Payment.formatCardNumber(this.$refs.cardNumber, 16);
    Payment.formatCardExpiry(this.$refs.cardExp);
    Payment.formatCardCVC(this.$refs.cardCvc);
  },
  methods: {
    cardValidate() {
      // console.log(this.cardInfo);
    },
  },
};
</script>

<style lang="scss" scope>
.b-with-fexpay {
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-weight: 600;
    font-size: 14px;
    color: white;
  }
  // letter-spacing: 0.5px;
  img {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.b-with-cc {
  font-weight: 500;
  font-size: 14px;
  strong {
    color: white;
  }
}

.merchant-title {
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.7px;
}
.merchant-subtitle {
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.7px;
}

.merchant-content {
  --max-width: 1120px;
  background-color: #f0f2f8 !important;
  display: flex;
  justify-content: center;
  padding: 120px 0 !important;
  input,
  textarea {
    background-color: white !important;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  .merchant-container {
    width: 85%;
    max-width: var(--max-width);
    display: flex;
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
          content: "";
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
    .interactive-area {
      margin-left: 25px;
      .logged-in {
        display: flex;
        background-color: rgba(var(--primary-color-rgb), 0.1);
        padding: 5px;
        border-radius: 5px;
        .logged-avatar {
          display: flex;
          align-items: center;
          img {
            border-radius: 5px;
          }
        }
        .logged-content {
          flex-grow: 1;
        }
      }
      .or {
        display: flex;
        align-items: center;
        margin: 20px 2px 10px 2px !important;
        small {
          margin: 0 10px !important;
          font-size: 12px;
          opacity: 0.7;
          letter-spacing: 0.3px;
          width: fit-content;
          min-width: max-content;
        }
        &::before {
          content: "";
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          width: 100%;
        }
        &::after {
          content: "";
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          width: 100%;
        }
      }
      .methods {
        display: flex;
        margin: 10px 0;
        li {
          // height: 50px;
          width: 150px;
          border-radius: 5px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          padding: 5px 7px;
          display: flex;
          flex-direction: column;
          margin-right: 5px;
          cursor: pointer;
          transition: 200ms all;
          .method-title {
            font-size: 12px;
            font-weight: 500;
            line-height: 14px;
            margin-left: 1px;
          }
          &.active {
            border-color: rgba(0, 0, 0, 0.8);
            background-color: rgba(0, 0, 0, 0.02);
            .method-icon svg {
              fill: rgba(0, 0, 0, 0.8);
            }
            .method-title {
              color: rgba(0, 0, 0, 0.8);
            }
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.02);
          }
        }
      }

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
    }
  }
  .card {
    background-color: white !important;
    // border: 1px solid rgba(0, 0, 0, 0.15);
  }
  .shadow-init {
    box-shadow: 0 0 0 1px hsl(0deg 0% 69% / 20%),
      0 15px 35px 0 rgb(49 49 93 / 8%), 0 5px 15px 0 rgb(0 0 0 / 6%);
  }
  .f-1 {
    flex: 1;
  }
}
</style>
