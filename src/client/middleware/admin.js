module.exports = ({ store, redirect }) => {

  if (!store.state.user.authenticated)
    return redirect('/auth/login')

  if (store.state.user.data.accountRank < 10)
    return redirect('/dashboard')

}
