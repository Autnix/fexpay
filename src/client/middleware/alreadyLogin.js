module.exports = ({ store, redirect, route }) => {

  if (store.state.user.authenticated)
    return redirect(route.query?.redirect || `/dashboard`)

}
