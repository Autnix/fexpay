export const state = () => ({
  authenticated: false,
  data: null
})

export const mutations = {

  login(state, data) {
    state.authenticated = true;
    state.data = data;
  }

}

export const actions = {

  login({ commit }, data) {
    commit('login', data)
  }

}