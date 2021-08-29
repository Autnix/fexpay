export default function ({ app: { $axios }, store }, inject) {
  const api = $axios.create()

  api.setToken(store.state?.user?.data?.token, 'Bearer');

  api.onError(error => {
    const code = parseInt(error.response?.status);

    if (code === 500) {

      store.dispatch('error/up', 'Yetkisiz işlem! Tekrar giriş yapmayı deneyin.');

      return Promise.resolve({
        data: {
          status: 500,
          message: 'UnauthorizedToken'
        }
      })
    }
  })

  inject('secureAxios', api)
}
