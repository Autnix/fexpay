export default ({ app }, inject) => {
  inject("sleep", async (delay) => await new Promise(resolve => setTimeout(() => { resolve() }, delay))
  )
}