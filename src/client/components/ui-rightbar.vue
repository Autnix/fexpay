<template>
  <div class="right-bar">
    <h3 class="bar-title">Kartlarım</h3>
    <div class="cards">
      <div class="card credit-card card-master">
        <div class="top">
          <span class="badge-st">BİRİNCİL</span>
        </div>
        <div class="name">
          <span>Bilal Atakan Ünal</span>
        </div>
        <div class="numbers">
          <div class="dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <span class="digit">4255</span>
        </div>
        <div class="due-date">
          <div class="date">
            <span>09/22</span>
          </div>
          <div class="brand">
            <img src="~/assets/img/cardbrands/mastercard.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="card credit-card card-visa">
        <div class="top">
          <!-- <span class="badge-st">BİRİNCİL</span> -->
        </div>
        <div class="name">
          <span>Bilal Atakan Ünal</span>
        </div>
        <div class="numbers">
          <div class="dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <span class="digit">4255</span>
        </div>
        <div class="due-date">
          <div class="date">
            <span>07/23</span>
          </div>
          <div class="brand">
            <img src="~/assets/img/cardbrands/visa.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="card credit-card">
        <div class="top">
          <!-- <span class="badge-st">BİRİNCİL</span> -->
        </div>
        <div class="name">
          <span>Bilal Atakan Ünal</span>
        </div>
        <div class="numbers">
          <div class="dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <span class="digit">4255</span>
        </div>
        <div class="due-date">
          <div class="date">
            <span>12/22</span>
          </div>
          <div class="brand">
            <img src="~/assets/img/cardbrands/americanexpress.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="add-more">
      <a href="#">
        <uil-plus-circle size="17px" /> <span>Yeni Kart Ekle</span>
      </a>
    </div>
    <hr />
    <h3 class="bar-title">Banka Hesaplarım</h3>
    <div class="cards">
      <div class="card bank bank-format">
        <div class="top">
          <div class="icon">
            <uil-university size="25px" />
          </div>
          <span class="badge-st">BİRİNCİL</span>
        </div>
        <div class="bankname">
          <span>TÜRKIYE CUMHURIYETI ZIRAAT BANKASI A.S.</span>
        </div>
        <div class="iban">
          <span>TR160011100000000090243491</span>
        </div>
        <div class="name">
          <span>Bilal Atakan Ünal</span>
        </div>
      </div>

      <div class="card bank bank-format">
        <div class="top">
          <div class="icon">
            <uil-university size="25px" />
          </div>
        </div>
        <!-- <div class="bankname">
          <span>DATAFEX HESAP BAKİYESİ</span>
        </div> -->
        <div class="iban">
          <span>DATAFEX HESAP BAKİYESİ</span>
        </div>
        <div class="name">
          <span>Bilal Atakan Ünal</span>
        </div>
      </div>
    </div>
    <div class="add-more">
      <a href="#">
        <uil-plus-circle size="17px" /> <span>Yeni Hesap Ekle</span>
      </a>
    </div>
  </div>
</template>

<script>
import { UilUniversity, UilPlusCircle } from "@iconscout/vue-unicons";

export default {
  components: {
    UilUniversity,
    UilPlusCircle,
  },
};
</script>

<style lang="scss" scoped>
hr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
}
.right-bar {
  --text-color: #fff;
  --background-color-sidebar: #274ad2;
  padding: 20px;
  overflow-y: auto;
  .bar-title {
    font-weight: 300;
    letter-spacing: 1px;
    font-size: 14px;
    margin-bottom: 1rem;
  }
  .cards {
    display: flex;
    flex-direction: column;
    .card {
      width: 100%;
      min-height: 90px;
      border-radius: 5px;
      -webkit-box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.45);
      -moz-box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.45);
      box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.45);
      margin-bottom: 20px;
      background: linear-gradient(to top left, #3a42b6 60%, #474fdc 40%);
      font-family: "Inconsolata", monospace;
      cursor: pointer;
      transition: 200ms all;
      &:hover {
        transform: scale(1.05);
      }
    }
    .credit-card {
      display: flex;
      flex-direction: column;
      .top {
        flex-grow: 1;
        position: relative;
        padding: 10px;
        .badge-st {
          position: absolute;
          top: 0px;
          right: 0px;
          font-weight: 500;
          font-family: "Rubik", sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          background-color: var(--background-color-sidebar);
          padding: 3px 5px;
          border-radius: 5px;
        }
      }
      .name {
        padding: 0 10px;
        span {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 15px;
          letter-spacing: 1px;
        }
      }
      .numbers {
        width: 100%;
        display: flex;
        // justify-content: space-between;
        padding: 10px;
        align-items: center;
        .digit {
          letter-spacing: 3px;
          font-size: 18px;
          font-weight: 600;
        }
        .dots {
          display: flex;
          margin-right: 10px;
          .dot {
            --height: 6px;
            margin-right: 5px;
            &::after {
              content: "";
              height: var(--height);
              width: var(--height);
              min-width: var(--height);
              border-radius: 50%;
              background-color: white;
              display: block;
            }
          }
        }
      }
      .due-date {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px 10px 10px;
        .date {
          display: flex;
          align-items: center;
          span {
            letter-spacing: 1px;
            font-size: 12px;
            font-weight: 500;
            color: rgba(white, 0.8);
          }
        }
        .brand {
          display: flex;
          align-items: center;
          img {
            height: 25px;
          }
        }
      }
    }
    .bank-format {
      padding: 10px;
      display: flex;
      flex-direction: column;
      .top {
        flex-grow: 1;
        padding-bottom: 10px;
        position: relative;
        .badge-st {
          position: absolute;
          top: 0;
          right: 0;
          font-weight: 500;
          font-family: "Rubik", sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          background-color: var(--background-color-sidebar);
          padding: 3px 5px;
          border-radius: 5px;
        }
      }
      .iban {
        display: flex;
        padding: 5px 0;
        span {
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 1px;
        }
      }
      .bankname {
        opacity: 0.7;
        span {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 10px;
          letter-spacing: 1px;
        }
      }
      .name {
        opacity: 0.7;
        span {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 15px;
          letter-spacing: 1px;
        }
      }
    }
  }
  .add-more {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    a {
      font-size: 12px;
      font-weight: 300;
      display: flex;
      justify-content: center;
      opacity: 0.9;
      transition: 200ms opacity;
      span {
        margin-left: 3px;
        margin-top: 1px;
        letter-spacing: 1px;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  .card-master {
    background: linear-gradient(
      to top left,
      #fe4c5f 60%,
      #ff7081 40%
    ) !important;
  }
  .card-visa {
    background: linear-gradient(
      to top left,
      #90caf8 60%,
      #a7d5fa 40%
    ) !important;
  }
  .bank {
    background: linear-gradient(
      -28deg,
      rgba(#3a4168, 0.7) 70%,
      #3a4168 30%
    ) !important;
  }
}
</style>