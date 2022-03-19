import axios from 'axios'

function getJobList({ companyId, categoryId, page = 1, pageSize = 100 }) {
  return axios({
    method: 'GET',
    url: `https://www.104.com.tw/company/ajax/joblist/${companyId}?roleJobCat=${categoryId}&area=0&page=${page}&pageSize=${pageSize}`,
    headers: {
      Referer: `https://www.104.com.tw/company/${companyId}`,
    },
  }).then(({ data }) => data)
}

export default async function handler(req, res) {
  const { companyId, categoryId } = req.query
  const { page } = JSON.parse(req.body)
  const initialData = await getJobList({ companyId, categoryId, page })

  res.status(200).json(initialData)
}
