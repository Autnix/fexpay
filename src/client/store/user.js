export const state = () => ({
  authenticated: false,
  data: null
})

export const mutations = {

  login(state, data) {
    state.authenticated = true;
    state.data = data;
  },

  logout(state) {
    state.authenticated = false;
    state.data = null;
  }

}

export const actions = {

  login({ commit }, data) {
    commit('login', data)
  },

  logout({ commit }) {
    commit('logout')
  }

}