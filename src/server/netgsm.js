const axios = require('axios');
const qs = require('qs');

module.exports = {
  send: (gsmno, message) => new Promise((resolve, reject) => {

    if (process.env.DEPLOY === "HEROKU") {
      return resolve("00")
    }

    const data = {
      usercode: process.env.NETGSM_USERNAME,
      password: process.env.NETGSM_PASSWORD,
      gsmno,
      message,
      msgheader: process.env.NETGSM_USERNAME
    };

    const result = axios.get(`https://api.netgsm.com.tr/sms/send/get/?${qs.stringify(data)}`)
        .then(res => res.data)
        .catch(err => {
          console.error(err);
          reject(err.result)
        })

    resolve(result)

  }),
  sendCode: (gsmno, code) => new Promise((resolve, reject) => {
    module.exports.send(gsmno, `${code} doğrulama kodu, ${('0' + (new Date()).getDate()).slice(-2)}.${('0' + (Number((new Date()).getMonth()) + 1)).slice(-2)}.${(new Date()).getFullYear()} ${('0' + (new Date()).getHours()).slice(-2)}:${('0' + (new Date()).getMinutes()).slice(-2)} tarihindeki FEXPAY kayıt işleminiz için gönderilmiştir.`)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
};
