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
  async nuxtServerInit({ dispatch, state }, { $axios }) {

    const { session } = await $axios.get("/client/init")
      .then(res => res.data)
      .catch((err) => {
        console.error(err);
        return ({ session: { error: { st: true, msg: 'Bilinmeyen bir hata meydana geldi!' } } })
      })


    if (session?.error?.st) {
      await dispatch('error/up', session.error.msg)
    }

    if (session?.user) {
      await dispatch('user/login', session.user);

      const check = await $axios.get('/client/check', {
        headers: {
          Authorization: `Bearer ${state.user.data?.token}`,
        }
      })
        .then(res => res.data)
        .catch(e => ({ status: 400 }))

      if (check?.status === 400) {
        await dispatch('error/up', "Oturumunuzun süresi doldu veya izinsiz bir erişim yaptınız. Lütfen tekrar giriş yapın!")
        await dispatch('user/logout');
        return false;
      }

      await dispatch('error/down');

    }

  },
  toggleTheme({ commit }) {
    commit('toggleTheme');
  },
  setDarkToTheme({ commit }, val) {
    commit('setDarkToTheme', val);
  }
}