import axios from 'axios'

export default async function handler(req, res) {
  const { jobNo } = req.query

  const { data } = await axios({
    method: 'GET',
    url: `https://www.104.com.tw/jb/104i/applyAnalysisToJob/all?job_no=${jobNo}`,
  })

  res.status(200).json(data)
}
