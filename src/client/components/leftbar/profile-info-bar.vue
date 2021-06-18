<template>
  <div class="profile-info-bar">
    <div class="profile">
      <div class="avatar">
        <img src="https://cdn.datafex.com.tr/fgjC8t.jpg" alt="" />
      </div>
      <div class="details">
        <span class="profile-name">Atakan Ünal</span>
        <span class="profile-status">Active</span>
      </div>
      <div class="more">
        <a href="#">
          <uil-angle-down size="40px" />
        </a>
      </div>
    </div>
    <div class="profile-submenu">
      <ul class="submenu-list">
        <li v-if="!$store.state.dark_mode">
          <a href="javascript:;" @click.prevent="toggleThemeMode()">
            <uil-moon size="20px" />
          </a>
        </li>
        <li v-else>
          <a href="javascript:;" @click.prevent="toggleThemeMode()">
            <uil-sun size="20px" />
          </a>
        </li>
        <li>
          <a @click.prevent="toDark()" href="#">
            <uil-cog size="20px" />
          </a>
        </li>
        <li>
          <a href="#">
            <uil-sign-out-alt size="20px" />
          </a>
        </li>
      </ul>
      <div class="profile-type">
        <span>STANDART</span>
      </div>
    </div>
    <div class="balance">
      <div class="balance-data">
        <span class="balance-value"> 269.50 ₺ </span>
        <span class="balance-subtitle"> Hesap Bakiyesi </span>
      </div>
      <div class="balance-more">
        <a href="#">
          <uil-plus-circle size="25px" />
          <div class="shadow-box">
            <span>Bakiye Ekle</span>
          </div>
        </a>
        <a href="#">
          <uil-arrow-circle-down size="25px" />
          <div class="shadow-box">
            <span>Bakiyemi Çek</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  UilCog,
  UilSignOutAlt,
  UilAngleDown,
  UilMoon,
  UilSun,
  UilPlusCircle,
  UilArrowCircleDown,
} from "@iconscout/vue-unicons";

export default {
  components: {
    UilCog,
    UilSignOutAlt,
    UilAngleDown,
    UilMoon,
    UilSun,
    UilPlusCircle,
    UilArrowCircleDown,
  },
  methods: {
    async toggleThemeMode() {
      await this.$store.dispatch("toggleTheme");
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-info-bar {
  display: flex;
  flex-direction: column;
  margin: 15px;
  .profile {
    --height: 90px;
    --padding: 15px;
    background-color: rgba(var(--primary-color-rgb), 0.1);
    border-radius: 5px;
    height: var(--height);
    display: flex;
    padding: var(--padding);
    .avatar {
      img {
        height: calc(var(--height) - calc(var(--padding) * 2));
        width: calc(var(--height) - calc(var(--padding) * 2));
        border-radius: 5px;
        border: 3px solid var(--primary-color);
      }
    }
    .details {
      flex-grow: 1;
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      span.profile-name {
        font-size: 17px;
        font-weight: 500;
      }
      span.profile-status {
        color: var(--primary-color);
        font-weight: 400;
        font-size: 13px;
      }
    }
    .more {
      display: flex;
      align-items: center;
      a {
        color: var(--primary-color);
        opacity: 0.7;
        transition: 200ms opacity;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
  .profile-submenu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .submenu-list {
      padding: 0;
      margin: 0;
      display: flex;
      li {
        margin-right: 10px;
        a {
          color: var(--text-color);
          transition: 200ms opacity;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
    .profile-type {
      background-color: var(--primary-color);
      border-radius: 5px;
      padding: 5px 7px;
      span {
        font-size: 12px;
        color: white;
        font-weight: 400;
      }
    }
  }
  .balance {
    display: flex;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 5px;
    background-color: rgba(var(--primary-color-rgb), 0.1);
    border-radius: 5px;
    justify-content: space-between;
    align-items: center;
    .balance-data {
      display: flex;
      flex-direction: column;
      .balance-value {
        font-size: 18px;
        font-weight: 400;
        letter-spacing: 1px;
      }
      .balance-subtitle {
        font-size: 12px;
        opacity: 0.5;
      }
    }
    .balance-more {
      display: flex;
      a {
        opacity: 0.7;
        transition: 200ms opacity;
        margin-left: 5px;
        position: relative;
        &:hover {
          opacity: 1;
          .shadow-box {
            visibility: visible;
            opacity: 1;
            top: -20px;
          }
        }
        .shadow-box {
          font-size: 10px;
          position: absolute;
          background-color: #181818;
          padding: 3px 5px;
          border-radius: 3px;
          width: max-content;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          visibility: hidden;
          transition: 200ms all;
        }
      }
    }
  }
}
</style>