<template>
  <div class="index">
    <div class="main light">
      <uiErrorHandle />
      <div class="content merchant-content">
        <Nuxt />
      </div>
    </div>
  </div>
</template>


<script>
export default {}
</script>


<style lang="scss">
.error-handle {
  svg {
    fill: white !important;
  }
  span {
    color: white !important;
  }
}
.merchant-content {
  --max-width: 1120px;
  background-color: #f0f2f8 !important;
  display: flex;
  justify-content: center;
  padding: 120px 0;
  input,
  textarea {
    background-color: white !important;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  .merchant-container {
    width: 85%;
    max-width: var(--max-width);
    display: flex;
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
