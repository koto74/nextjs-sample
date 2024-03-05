/*
  SSGのgetStaticPropsに対し、SSRではげtServerSidePropsを定義する。
  SSRではページを描画する前にgetServerSidePropsが呼ばれて、この関数が返したpropsを元にページを描画する。
*/

import { GetServerSideProps, NextPage } from "next"
import Head from "next/head"

type SSRProps = {
  message: string
}

const SSR: NextPage<SSRProps> = (props) => {
  const { message } = props

  return (
    <div>
      <Head>
        <title>Server Side Rendering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページはSSRによってアクセスじにサーバーで描画されたページ</p>
        <p>{ message }</p>
      </main>
    </div>
  )
}

// getServerSidePropsはページへのリクエスト時に実行される
// この関数はサーバーで実行されるため、クライアントのコードを含むことができない
export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp} にこのページのgetServerSidePropsが実行された`
  console.log(message)

  return {
    props: {
      message,
    },
  }
}

export default SSR

/*
  getServerSidePropsの引数のcontextでは、getStaticPropsのcontextで参照できるデータに加え、
  リクエストの情報などを参照できる

  req -> http.IncomingMessageのインスタンスで、リクエストの情報やCookieを参照できる
  res -> http.ServerResponseのインスタンスでCookieをセットしたり、レスポンスヘッダーを書き換えたりに使える
  resolvedUrl -> リクエストされたURLのパス
  query -> そのクエリをオブジェクトにしたもの
*/
