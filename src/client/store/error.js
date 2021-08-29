export const state = () => ({
  display: false,
  message: null
})

export const mutations = {

  up(state, message) {
    state.display = true;
    state.message = message;
  },

  down(state) {
    state.display = false;
    state.message = null;
  }

}

export const actions = {

  up({ commit }, message) {
    commit('up', message);
  },

  down({ commit }) {
    commit('down');
  }

}