import axios from 'axios'

export default async function handler(req, res) {
  const { companyId } = req.query

  const { data } = await axios({
    method: 'GET',
    url: `https://www.104.com.tw/company/ajax/content/${companyId}`,
    headers: {
      Referer: `https://www.104.com.tw/company/${companyId}`,
    },
  })

  res.status(200).json(data)
}
