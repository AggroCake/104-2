import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import styles from './InputPage.module.scss'

function InputPage() {
  const router = useRouter()
  const [inputUrl, setInputUrl] = useState('')

  let companyId = null
  if (inputUrl !== '') {
    try {
      const url = new URL(inputUrl)
      const { hostname, pathname } = url

      if (
        hostname === 'www.104.com.tw' &&
        pathname.search(/\/company\/\w+/) === 0
      ) {
        const pathnameArray = pathname.split('/')
        companyId = pathnameArray[pathnameArray.length - 1]
      }
    } catch (error) {
      if (error.name !== 'TypeError') {
        console.error(error)
      }
    }
  }

  const isButtonDisabled = companyId === null

  const onInputChange = useCallback(
    ({ target }) => setInputUrl(target.value),
    []
  )

  const onClick = useCallback(() => {
    router.push({
      pathname: '/job-category/[companyId]',
      query: { companyId },
    })
  }, [router, companyId])

  return (
    <div className={styles.container}>
      <Head>
        <title>104 Job Category Fetcher</title>
      </Head>

      <div>
        <h1 className={styles.title}>104 Job Category Fetcher (Beta)</h1>
        <h2 className={styles.subtitle}>一鍵獲取104公司職務類別資訊。</h2>
      </div>

      <div className={styles.inputContainer}>
        <input
          onChange={onInputChange}
          placeholder="請輸入104公司網址"
          type="text"
          value={inputUrl}
        />
        <button
          onClick={onClick}
          className={isButtonDisabled ? styles.disabled : undefined}
          disabled={isButtonDisabled}
        >
          {!isButtonDisabled ? '獲取' : '網址格式不正確'}
        </button>
      </div>

      <div className={styles.hintContainer}>
        <div className={styles.hintTitle}>Beta 版網站有什麼新功能？</div>
        <div className={styles.hintContent}>
          1. 讀取某個職缺類別底下的職缺時，現在能夠一次讀取所有職缺，而不是 20
          筆。
          <br />
          2. 職缺區塊之背景，按照應徵人數數量上色。
          <br />
          3. 職缺區塊會顯示應徵者的年齡分佈圖。
        </div>
        <div className={styles.hintTitle}>什麼是104公司網址？</div>
        <div className={styles.hintContent}>
          以下是幾個104公司網址範例，您可以把它複製起來，貼到上方的輸入欄位試試。
          <br />
          <code className={styles.url}>
            https://www.104.com.tw/company/1a2x6bjwfs
          </code>
          <br />
          <code className={styles.url}>
            https://www.104.com.tw/company/1a2x6bjwfs?jobsource=cs_2018indexpoc
          </code>
        </div>
      </div>
    </div>
  )
}

export default InputPage
