import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import styles from './JobCategoryPage.module.scss'
import JobCategoryItem from './JobCategoryItem'
import { getCompanyData, getJobCategory } from 'api'

const makeLogoUrl = (url) => {
  if (!url) {
    return ''
  }

  if (url.startsWith('//')) {
    url = window.location.protocol + url
  }

  return url
}

function JobCategoryPage() {
  const router = useRouter()
  const { companyId } = router.query

  const [companyData, setCompanyData] = useState('')
  const [jobCategory, setJobCategory] = useState([])

  // For display settings
  const [showCount, setShowCount] = useState(true)
  const [showDetail, setShowDetail] = useState(true)

  useEffect(() => {
    getCompanyData(companyId).then(({ data }) => {
      setCompanyData({
        name: data.custName,
        unprocessedLogoUrl: data.logo,
      })
    })
  }, [companyId])

  useEffect(() => {
    getJobCategory(companyId).then(({ data }) => {
      const fetchedJobCategory = Object.entries(data.roleJobCat).map((entry) => ({
        companyId,
        categoryId: entry[0],
        text: entry[1],
      }))
      setJobCategory(fetchedJobCategory)
    })
  }, [companyId])

  const toggleShowCount = useCallback(() => {
    setShowCount((prevValue) => !prevValue)
  }, [])

  const toggleShowDetail = useCallback(() => {
    setShowDetail((prevValue) => !prevValue)
  }, [])

  const backToTop = useCallback(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }, [])

  const backToInputPage = useCallback(() => {
    router.push('/')
  }, [router])

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {companyData && `${companyData.name} - `}104 Job Category Fetcher
        </title>
      </Head>

      {(!companyData || jobCategory.length === 0) && <div>資料讀取中</div>}

      {companyData && (
        <div className={styles.header}>
          {/* eslint-disable-next-line */}
          <img
            className={styles.logo}
            src={makeLogoUrl(companyData.unprocessedLogoUrl)}
            alt="Company logo"
          />
          <h2 className={styles.companyName}>{companyData.name}</h2>
        </div>
      )}

      {jobCategory.length > 0 && (
        <div>
          {jobCategory.map((category) => (
            <JobCategoryItem
              key={category.categoryId}
              category={category}
              showCount={showCount}
              showDetail={showDetail}
            />
          ))}
        </div>
      )}

      <div className={styles.settingGroup}>
        {/*
        <button onClick={toggleShowCount}>
          {!showCount ? '顯示' : '隱藏'}職務類別人數
        </button>
        <button onClick={toggleShowDetail}>
          {!showDetail ? '顯示' : '隱藏'}詳細工作機會
        </button>
        */}
        <button onClick={backToTop}>返回頁面頂端</button>
        <button onClick={backToInputPage}>返回查詢頁面</button>
      </div>
    </div>
  )
}

export default JobCategoryPage
