module.exports = ({ store, redirect }) => {

  if (!store.state.user.authenticated)
    return redirect('/auth/login')

}
