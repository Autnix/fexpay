export default ({ app }, inject) => {
  inject("sleep", async (delay) => {
    return new Promise(resolve => setTimeout(() => { resolve() }, delay))
  })
}