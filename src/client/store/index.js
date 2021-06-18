export const state = () => ({
  dark_mode: false,
})

export const mutations = {
  toggleTheme(state) {
    state.dark_mode = !state.dark_mode
  },
  setDarkToTheme(state, val) {
    state.dark_mode = val;
  }
}

export const actions = {
  async nuxtServerInit(Vuex_, Server_) {

  },
  toggleTheme({ commit }) {
    commit('toggleTheme');
  },
  setDarkToTheme({ commit }, val) {
    commit('setDarkToTheme', val);
  }
}