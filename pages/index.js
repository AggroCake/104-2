import { useState, useEffect } from 'react'
import { getJobCategoryByCompany, getJobListByCompanyAndCategory } from '../api'
import styles from './index.module.css'

function JobCategory({ category, showDetail }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    getJobListByCompanyAndCategory(
      category.companyId,
      category.categoryId
    ).then(({ data }) => {
      setData(data)
    })
  }, [category])

  return (
    <div>
      <h5>
        <a
          href={`https://www.104.com.tw/company/${category.companyId}?roleJobCat=${category.categoryId}&area=0&page=1`}
          target="_blank"
          rel="noreferrer"
        >
          {category.text}
        </a>
        {data && `: ${data.totalCount}`}
      </h5>
      {data && data.list.normalJobs && showDetail && (
        <ul>
          {data.list.normalJobs.map((job) => (
            <li key={job.jobNo}>
              <a href={job.jobUrl} target="_blank" rel="noreferrer">
                {job.jobName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Home() {
  const [inputUrl, setInputUrl] = useState('')
  const [jobCategory, setJobCategory] = useState([])
  const [showDetail, setShowDetail] = useState(false)

  let companyId = null
  if (inputUrl) {
    try {
      const url = new URL(inputUrl)
      const pathnameArray = url.pathname.split('/')
      companyId = pathnameArray[pathnameArray.length - 1]
    } catch (error) {}
  }

  const onClick = () => {
    getJobCategoryByCompany(companyId).then(({ data }) => {
      const newJobCategory = Object.entries(data.roleJobCat).map((entry) => ({
        companyId,
        categoryId: entry[0],
        text: entry[1],
      }))

      setJobCategory(newJobCategory)
    })
  }

  return (
    <div className={styles.container}>
      <div className="form-group">
        <label className="form-label">
          請輸入104公司頁面網址
          <br />
          可以複製這個範例網址試試:{' '}
          <code>https://www.104.com.tw/company/7jzoq8g</code>
        </label>

        <input
          className="form-input"
          type="text"
          placeholder="https://www.104.com.tw/company/......."
          value={inputUrl}
          onChange={({ target }) => setInputUrl(target.value)}
        />
      </div>

      <button
        className={`btn ${companyId ? 'btn-primary' : 'btn-error'}`}
        onClick={onClick}
      >
        {companyId ? '送出' : '網址不正確'}
      </button>

      {jobCategory.length > 0 && (
        <>
          <hr />
          <div className="form-group">
            <label className="form-switch">
              <input
                type="checkbox"
                checked={showDetail}
                onChange={({ target }) => {
                  console.log(target.checked)
                  setShowDetail(target.checked)
                }}
              />
              <i className="form-icon"></i>
              顯示工作機會列表
            </label>
          </div>
          <div>
            {jobCategory.map((category) => (
              <JobCategory
                key={category.categoryId}
                category={category}
                showDetail={showDetail}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home
