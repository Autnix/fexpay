export const state = () => ({
  data: []
})

export const mutations = {

  setShops(state, shops) {
    state.data = shops;
  },

  addShop(state, shop) {
    state.data.push(shop);
  },

  delShop(state, shop) {
    state.data = state.data.filter(item => item._id !== shop._id);
  },

}

export const actions = {

  setShops({ commit }, shops) {
    commit('setShops', shops)
  },

  addShop({ commit }, shop) {
    commit('addShop', shop)
  },

  delShop({ commit }, shop) {
    commit('delShop', shop)
  }

}