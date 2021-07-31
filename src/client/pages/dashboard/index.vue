<template>
  <div>
    <div class="card"></div>

    <div style="margin: 3rem 0"></div>

    <h2 class="main-title">Son İşlemler</h2>
    <div class="sub">
      <span class="main-desc">Gelen ve Gidenler</span>
      <span class="main-desc link">
        <a href="#">Hepsini Gör</a>
      </span>
    </div>
    <ul class="transactions">
      <li class="price-down">
        <div class="avatar">
          <img
            src="https://media-exp3.licdn.com/dms/image/C4D0BAQH4WN-964jlZA/company-logo_200_200/0/1611347723652?e=1632355200&v=beta&t=p4tf0D16kuuAyBHK26MnMj5G37hdtTXYdsBdJqVM7ZA"
            alt=""
          />
        </div>
        <div class="details">
          <div class="name">DataFex Fatura Ödeme</div>
          <div class="desc">Giden Transfer</div>
        </div>
        <div class="values">
          <div class="price"><span>- ₺127,54</span></div>
          <div class="date">18.06.2021</div>
        </div>
        <div class="icon">
          <uil-arrow-down size="25px" />
        </div>
      </li>
      <li v-for="n in 20" class="price-up" :key="n">
        <div class="avatar">
          <img src="https://cdn.datafex.com.tr/fgjC8t.jpg" alt="" />
        </div>
        <div class="details">
          <div class="name">Atakan Unal</div>
          <div class="desc">Gelen Transfer</div>
        </div>
        <div class="values">
          <div class="price"><span>+ ₺92,40</span></div>
          <div class="date">16.06.2021</div>
        </div>
        <div class="icon">
          <uil-arrow-up size="25px" />
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import {
  UilBill,
  UilArrowDown,
  UilArrowUp,
  UilWallet,
} from "@iconscout/vue-unicons";

export default {
  components: {
    UilBill,
    UilArrowDown,
    UilArrowUp,
    UilWallet,
  },
};
</script>

<style scoped>
</style>