import { useEffect, useState } from 'react'
import { getJobListByCompanyAndCategory } from '../../api'

function JobCategoryItem({ category, showCount, showDetail }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    getJobListByCompanyAndCategory(
      category.companyId,
      category.categoryId
    ).then(({ data }) => setData(data))
  }, [category])

  return (
    <div>
      <h3>
        <a
          href={`https://www.104.com.tw/company/${category.companyId}?roleJobCat=${category.categoryId}&area=0&page=1`}
          rel="noreferrer"
          target="_blank"
        >
          {category.text}
        </a>
        {data && showCount && `: ${data.totalCount}`}
      </h3>
      {data && data.list.normalJobs && showDetail && (
        <ul>
          {data.list.normalJobs.map((job) => (
            <li key={job.jobNo}>
              <a href={job.jobUrl} rel="noreferrer" target="_blank">
                {job.jobName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default JobCategoryItem
