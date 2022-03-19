import { useEffect, useState } from 'react'
import { getJobList } from 'api'
import JobEntry from './JobEntry'

function JobCategoryItem({ category }) {
  const [collapsed, setCollapsed] = useState(true) // For UI
  const [data, setData] = useState(null)
  // const [isDataFullyLoaded, setIsDataFullyLoaded] = useState(false)

  useEffect(() => {
    getJobList(category.companyId, category.categoryId).then(({ data }) =>
      setData(data)
    )
  }, [category])

  const handleClick = () => {
    setCollapsed((prevValue) => !prevValue)
  }

  return (
    <div>
      <div>
        <button onClick={handleClick}>{collapsed ? '+' : '-'}</button>
        <a
          href={`https://www.104.com.tw/company/${category.companyId}?roleJobCat=${category.categoryId}&area=0&page=1`}
          rel="noreferrer"
          target="_blank"
        >
          {category.text}
        </a>
        {data && data.totalCount}
      </div>
      {!collapsed && data && data.list.normalJobs && (
        <div>
          {data.list.normalJobs.map((job, idx) => (
            <JobEntry key={job.jobNo} job={job} idx={idx} />
          ))}
        </div>
      )}
    </div>
  )
}

export default JobCategoryItem
