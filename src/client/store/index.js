export const state = () => ({
  dark_mode: true,
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
  async nuxtServerInit({ dispatch }, { $axios }) {

    let { session } = await $axios.get("/server-init")
      .then(res => res.data)

    if (session?.user)
      dispatch('user/login', session.user)

  },
  toggleTheme({ commit }) {
    commit('toggleTheme');
  },
  setDarkToTheme({ commit }, val) {
    commit('setDarkToTheme', val);
  }
}