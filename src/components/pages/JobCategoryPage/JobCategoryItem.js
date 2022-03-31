import { useEffect, useState } from 'react'
import { getJobList } from 'api'
import JobEntry from './JobEntry'
import styles from './JobCategoryItem.module.scss'

function JobCategoryItem({ category }) {
  const [collapsed, setCollapsed] = useState(true) // For UI
  const [data, setData] = useState(null)
  // const [isDataFullyLoaded, setIsDataFullyLoaded] = useState(false)

  useEffect(() => {
    getJobList(category.companyId, category.categoryId).then(({ data }) => setData(data))
  }, [category])

  const handleClick = () => {
    setCollapsed((prevValue) => !prevValue)
  }

  const getTotalCount = () => {
    if (!data || !data.list) return 0

    let count = 0
    if (data.list.topJobs) count += data.list.topJobs.length
    if (data.list.normalJobs) count += data.list.normalJobs.length
    return count
  }

  return (
    <div>
      <div className={styles.title}>
        <button onClick={handleClick}>{collapsed ? '+' : '-'}</button>
        <a
          href={`https://www.104.com.tw/company/${category.companyId}?roleJobCat=${category.categoryId}&area=0&page=1`}
          rel="noreferrer"
          target="_blank"
        >
          {category.text}
        </a>
        {getTotalCount()}
      </div>
      {!collapsed && data && (
        <>
          {data.list.topJobs && (
            <div>
              <h3>Pinned jobs</h3>
              {data.list.topJobs.map((job, idx) => (
                <JobEntry key={job.jobNo} job={job} idx={idx} />
              ))}
            </div>
          )}
          {data.list.normalJobs && (
            <div>
              <h3>Normal jobs</h3>
              {data.list.normalJobs.map((job, idx) => (
                <JobEntry key={job.jobNo} job={job} idx={idx} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default JobCategoryItem
