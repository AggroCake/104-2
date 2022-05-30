import _ from 'lodash'
import { useEffect, useState } from 'react'
import { getCompanyData, getJobCategory, getJobList } from 'api'

const STAGE = {
  INPUT: 0,
  OUTPUT: 1,
}

const parse104Url = (inputUrl) => {
  try {
    const url = new URL(inputUrl)
    const { hostname, pathname } = url

    if (
      hostname === 'www.104.com.tw' &&
      pathname.search(/\/company\/\w+/) === 0
    ) {
      const pathnameArray = pathname.split('/')
      const companyId = pathnameArray[pathnameArray.length - 1]
      return companyId
    }
  } catch (error) {}

  return null
}

const isInterestedCategory = (categoryId) => {
  return (
    // 行銷╱企劃╱專案管理類
    categoryId.includes('1_2004') ||
    categoryId.includes('2_2004') ||
    // 資訊軟體系統類
    categoryId.includes('1_2007') ||
    categoryId.includes('2_2007') ||
    // 經營╱人資類
    categoryId.includes('1_2001') ||
    categoryId.includes('2_2001') ||
    // 行政╱總務╱法務類
    categoryId.includes('1_2002') ||
    categoryId.includes('2_2002') ||
    // 財會╱金融專業類
    categoryId.includes('1_2003') ||
    categoryId.includes('2_2003') ||
    // 餐飲類人員
    categoryId.includes('1_2006001') ||
    categoryId.includes('2_2006001')
  )
}

const count = (companyData, pattern) => {
  let sum = 0

  for (const categoryId of Object.keys(companyData.categoryToJobCountMap)) {
    if (
      categoryId.includes(`1_${pattern}`) ||
      categoryId.includes(`2_${pattern}`)
    ) {
      sum += companyData.categoryToJobCountMap[categoryId]
    }
  }
  return sum
}

function InputForm({ inputValue, setInputValue, setStage }) {
  const onChange = (e) => {
    setInputValue(e.target.value)
  }

  const onClick = () => {
    setStage(STAGE.OUTPUT)
  }

  return (
    <div>
      <textarea onChange={onChange} value={inputValue} />
      <button onClick={onClick}>Submit</button>
    </div>
  )
}

function Results({ inputValue, setStage }) {
  const [results, setResults] = useState(null)
  const [showDetail, setShowDetail] = useState(true)

  const onClick = () => {
    setStage(STAGE.INPUT)
  }

  useEffect(() => {
    async function fetchData() {
      const companyIdList = inputValue
        .split('\n')
        .filter((url) => url !== '')
        .map((url) => parse104Url(url))
        .filter((url) => url !== null)

      const newResults = []

      for (const companyId of companyIdList) {
        const {
          data: { roleJobCat: categories },
        } = await getJobCategory(companyId)

        const {
          data: { custName: companyName },
        } = await getCompanyData(companyId)

        const categoryIdList = Object.keys(categories)

        const companyData = {
          id: companyId,
          name: companyName,
          categoryToJobCountMap: {},
        }

        for (const categoryId of categoryIdList) {
          if (!isInterestedCategory(categoryId)) continue

          const {
            data: { list: jobList },
          } = await getJobList(companyId, categoryId)

          companyData.categoryToJobCountMap[categoryId] =
            jobList.topJobs.length + jobList.normalJobs.length
        }

        newResults.push(companyData)
      }

      setResults(newResults)
    }

    fetchData()
  }, [inputValue])

  if (!results) return <div>Loading...</div>

  return (
    <div>
      <button onClick={onClick}>Go back</button>
      {showDetail && (
        <button onClick={() => setShowDetail(false)}>Hide detail</button>
      )}
      {!showDetail && (
        <button onClick={() => setShowDetail(true)}>Show detail</button>
      )}
      <hr />
      <table border="1">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Digital</td>
            {showDetail && <td>行政╱總務╱法務類</td>}
            {showDetail && <td>資訊軟體系統類</td>}
            <td>Logistics</td>
            {showDetail && <td>經營╱人資類</td>}
            {showDetail && <td>行政╱總務╱法務類</td>}
            {showDetail && <td>財會╱金融專業類</td>}
            <td>餐飲類人員</td>
          </tr>
        </thead>
        <tbody>
          {results.map((companyData) => (
            <tr key={companyData.id}>
              <td>{companyData.id}</td>
              <td>{companyData.name}</td>
              <td>{count(companyData, '2004') + count(companyData, '2007')}</td>
              {showDetail && <td>{count(companyData, '2004')}</td>}
              {showDetail && <td>{count(companyData, '2007')}</td>}
              <td>
                {count(companyData, '2001') +
                  count(companyData, '2002') +
                  count(companyData, '2003')}
              </td>
              {showDetail && <td>{count(companyData, '2001')}</td>}
              {showDetail && <td>{count(companyData, '2002')}</td>}
              {showDetail && <td>{count(companyData, '2003')}</td>}
              <td>{count(companyData, '2006001')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Statistics() {
  const [stage, setStage] = useState(STAGE.INPUT)
  const [inputValue, setInputValue] = useState('')

  if (stage === STAGE.INPUT) {
    return (
      <InputForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        setStage={setStage}
      />
    )
  }

  if (stage === STAGE.OUTPUT) {
    return <Results inputValue={inputValue} setStage={setStage} />
  }
}

export default Statistics
