const API_BASE_URL = '/api'

function fetchJson(url, body = {}) {
  // TODO: Fix this
  return fetch(url, { method: 'post', body: JSON.stringify(body) })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getCompanyData(companyId) {
  return fetchJson(`${API_BASE_URL}/getCompanyData/${companyId}`)
}

export function getJobCategory(companyId) {
  return fetchJson(`${API_BASE_URL}/getJobCategory/${companyId}`)
}

export async function getJobList(companyId, categoryId) {
  const { data: firstPageData } = await fetchJson(
    `${API_BASE_URL}/getJobList/${companyId}/${categoryId}`
  )

  for (let page = 2; page <= firstPageData.totalPages; page++) {
    const { data } = await fetchJson(
      `${API_BASE_URL}/getJobList/${companyId}/${categoryId}}`,
      { page: 2 }
    )
    firstPageData.list.topJobs = [
      ...firstPageData.list.topJobs,
      ...data.list.topJobs,
    ]
    firstPageData.list.normalJobs = [
      ...firstPageData.list.normalJobs,
      ...data.list.normalJobs,
    ]
  }

  return { data: firstPageData }
}

export function getJobAnalysis(jobNo) {
  return fetchJson(`${API_BASE_URL}/getJobAnalysis/${jobNo}`)
}
