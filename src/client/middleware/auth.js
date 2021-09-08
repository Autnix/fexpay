module.exports = ({ store, redirect, route }) => {

  if (!store.state.user.authenticated)
    return redirect(`/auth/login?redirect=${encodeURIComponent(route.path || '')}`)

}
