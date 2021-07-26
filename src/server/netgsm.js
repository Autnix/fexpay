const axios = require('axios');
const qs = require('qs');

module.exports = {
  send: (gsmno, message) => new Promise(async (resolve, reject) => {

    if (process.env.DEPLOY == "HEROKU") {
      return resolve("00")
    }

    let data = {
      usercode: process.env.NETGSM_USERNAME,
      password: process.env.NETGSM_PASSWORD,
      gsmno,
      message,
      msgheader: process.env.NETGSM_USERNAME
    };

    console.log(qs.stringify(data));

    let result = await
      axios.get(`https://api.netgsm.com.tr/sms/send/get/?${qs.stringify(data)}`)
        .then(res => res.data)
        .catch(err => {
          console.error(err);
          reject(err.result)
        })

    console.log(result);

    resolve(result)

  }),
  sendCode: (gsmno, code) => new Promise(async (resolve, reject) => {
    await module.exports.send(gsmno, `${code} doğrulama kodu, ${('0' + (new Date()).getDate()).slice(-2)}.${('0' + (Number((new Date()).getMonth()) + 1)).slice(-2)}.${(new Date()).getFullYear()} ${('0' + (new Date()).getHours()).slice(-2)}:${('0' + (new Date()).getMinutes()).slice(-2)} tarihindeki FEXPAY kayıt işleminiz için gönderilmiştir.`)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
};
