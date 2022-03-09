const API_BASE_URL = '/api'

export function getCompanyData(companyId) {
  return fetch(`${API_BASE_URL}/getCompanyData/${companyId}`)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

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
