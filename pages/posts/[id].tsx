import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"


type PostProps = {
  id: string
}

const Post: NextPage<PostProps> = (props) => {
  const { id } = props
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p>このページは静的サイト生成によってビルドじに生成されたページ</p>
        <p>{`/posts/${id}に対応するページ`}</p>
      </main>
    </div>
  )
}

// getStaticPathsは生成したいページのパスパラメータの組み合わせを返す
// このファイルはpages/posts/[id].tsxなので、パスパラメータとしてidの値を返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  // それぞれのページのパスパラメータをまとめたもの
  const paths = [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } },
  ]

  // fallbackをfalseにすると、pathsで定義されたページ以外は404ページになる
  return { paths, fallback: false }
}

// パラメータの方を定義
interface PostParams extends ParsedUrlQuery {
  id: string
}

// getStaticPaths実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<PostProps, PostParams> = async (context) => {
  return {
    /*
    context.params!['id'] の ! は TypeScript の非 null assertion operator です。これは、context.params が null または undefined でないことを TypeScript コンパイラに伝えます。つまり、context.params が null または undefined の場合でも、その後のプロパティ（この場合は ['id']）にアクセスすることを許可します。
    ただし、この演算子は注意が必要です。context.params が実際に null または undefined の場合、ランタイムエラーが発生します。そのため、非 null assertion operator を使用する前に、値が null または undefined でないことを確認することが重要です。
    */
    props: {
      id: context.params!['id'],
    },
  }
}

export default Post

/*
  useRouteは関数コンポーネント内でルーティング情報にアクセスするためのフック
  router.pushでページ遷移にも利用できる

  const router = useRouter()
  useEffect(() => {
    router.push('/userouter)
  })
*/
