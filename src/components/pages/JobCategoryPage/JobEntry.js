import { useEffect, useState } from 'react'
import { LineChart, CartesianGrid, Line, Tooltip, XAxis } from 'recharts'
import { getJobAnalysis } from 'api'
import styles from './JobEntry.module.scss'

function totalToClassName(total) {
  if (total === null) return styles.transparent

  // 0-5
  if (total === 0) return styles.background1
  if (total <= 5) return styles.background1

  // 6-10
  if (total <= 10) return styles.background2

  // 11-30
  if (total <= 30) return styles.background3

  // >30
  return styles.background3
}

function Chart({ data }) {
  const processedData = Object.values(data)
    .filter((v) => typeof v === 'object')
    .map((entry) => ({
      name: entry.yearRangeName,
      value: Number(entry.count),
    }))

  return (
    <LineChart
      width={400}
      height={120}
      data={processedData}
      margin={{ top: 5, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Line
        type="monotone"
        name="應徵人數"
        dataKey="value"
        stroke="#8884d8"
        dot={false}
      />
      <Tooltip />
      <XAxis dataKey="name" />
    </LineChart>
  )
}

function JobEntry({ job, idx }) {
  const [analysisData, setAnalysisData] = useState(null)
  const total = analysisData ? analysisData.yearRange.total : null
  const className = totalToClassName(total)

  useEffect(() => {
    getJobAnalysis(job.jobNo).then((data) => {
      setAnalysisData(data)
    })
  }, [job])

  return (
    <div className={className}>
      <div>
        {idx + 1}{' '}
        <a href={job.jobUrl} rel="noreferrer" target="_blank">
          {job.jobName}
        </a>
        {total !== null && ` 應徵人數: ${total}`}
      </div>
      {analysisData && <Chart data={analysisData.yearRange} />}
    </div>
  )
}

export default JobEntry
