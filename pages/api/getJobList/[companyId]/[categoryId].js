import axios from 'axios'

export default async function handler(req, res) {
  const { companyId, categoryId } = req.query

  const { data } = await axios({
    method: 'GET',
    url: `https://www.104.com.tw/company/ajax/joblist/${companyId}?roleJobCat=${categoryId}&area=0`,
    headers: {
      Referer: `https://www.104.com.tw/company/${companyId}`,
    },
  })

  res.status(200).json(data)
}
