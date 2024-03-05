/*
  ファイル内にgetStaticPropsという関数を定義してexportすると、その関数はビルドじに実行される。
  getStaticPropsは戻り値としてpropsを返すことができ、その値がページコンポーネントへ渡されて描画される。
*/

import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head'

// ページコンポーネントのpropsの型定義
type SSGProps = {
  message: string
}

// SSG向けのページを実装
// NextPageはNext.jsのPages向けの型
// NextPage<props>でpropsが入るPageであることを明示

const SSG: NextPage<SSGProps> = (props) => {
  const { message } = props
  return (
    <div>
      {/* Headコンポーネントで包むと、その要素は<head>タグに配置される */}
      <Head>
        <title>Static Site Generation</title>
        <link rel="icon" href='/favicon.ico' />
      </Head>
      <main>
        <p>このページは静的サイト生成によってビルドじに生成されたページ</p>
        <p>{message}</p>
      </main>
    </div>
  );
}

// getStaticPropsはビルドじに実行される
// GetStaticProps<SSGProps>はSSGPropsを引数にとるgetStaticPropsの型
export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
  const timestamp = new Date().toLocaleString()
  const message = `${timestamp}にgetStaticPropsが実行された`
  console.log(message)
  return {
    // 返したpropsをもとにページコンポーネントを描画
    props: {
      message,
    },
  }
}

export default SSG

/*
  contextは実行関連の情報がまとまったオブジェクト
  context.localeのような形でアクセスする

  params -> パスパラメータ。SSGの場合はgetStaticPaths関数を別途定義した時に参照可能
  locale -> 現在のロケール情報（可能な場合）
  locales -> サポートしているロケールの配列（可能な場合）
  defaultLocale -> デフォルトのロケールのデータ（可能な場合）
  preview -> プレビューモードの有無
  previewData -> プレビューモードでsetPreviewDataによって設定されたデータ
*/
