<template>
  <div class="recommends-bar">
    <div class="card-recommends">
      <p>
        Daha fazla özellikten yararlanmak için <br />
        hesabını <strong>Premium</strong>'a yükselt
      </p>
      <button>Upgrade</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recommends-bar {
  margin: 15px;
  .card-recommends {
    background-color: rgba(var(--primary-color-rgb), 0.2);
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    align-items: center;
    p {
      font-size: 14px;
      text-align: center;
      margin-bottom: 10px;
      color: var(--text-color);
    }
    button {
      background-color: var(--primary-color);
      padding: 10px 30px;
      font-size: 16px;
      color: var(--background-color-sidebar);
      font-weight: 600;
      cursor: pointer;
      border: 0;
      border-radius: 5px;
    }
  }
}
</style>