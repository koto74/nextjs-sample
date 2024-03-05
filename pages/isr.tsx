/*
  インクリメンタル静的再生性（ISR）は、SSGの応用と燃えるレンダリング手法
  特徴　->　ページに寿命を設定でき、寿命を過ぎたページについては最新の情報での再生性を試みて、静的ページを配信しつつ情報を更新できる

  revalidateを返すgetStaticPropsを用いる
  getStaticPropsでrevalidateを返すとその値が有効期間となり、有効期間が過ぎたページは再生成される。
*/

import { GetStaticProps, NextPage } from "next"
import { useRouter } from "next/router"

type ISRProps = {
  message: string
}

// ISRPropsを受け取るNextPageコンポーネントを定義
const ISR: NextPage<ISRProps> = (props) => {
  const { message } = props

  const router = useRouter()

  if (router.isFallback) {
    // ページが再生成される間に表示するコンポーネント
    return <div>Loading...</div>
  }

  return (
    <div>
      <main>
        <p>このページはISRによって生成されたページ</p>
        <p>{ message }</p>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps<ISRProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp} にこのページのgetStaticPropsが実行された`

  return {
    props: {
      message
    },
    revalidate: 5, // 5秒ごとに再生成
  }
}

export default ISR
