const API_BASE_URL = 'http://localhost:3000/api'

export function getJobCategoryByCompany(companyId) {
  return fetch(`${API_BASE_URL}/getJobCategory/${companyId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getJobListByCompanyAndCategory(companyId, categoryId) {
  return fetch(`${API_BASE_URL}/getJobList/${companyId}/${categoryId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
