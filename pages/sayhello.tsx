import { useEffect, useState } from "react";

function Sayhello() {
  // 内部で状態を保つためusesStateを利用
  const [data, setData] = useState({ name: '' });
  // 外部のAPIにリクエストするのは副作用なのでuseEffect内で処理
  useEffect(() => {
    // pages/api/hello.tsのないようにリクエスト
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => { setData(data) });
  }, [])
  return (
    <div>
      hello {data.name}
    </div>
  )
}

export default Sayhello;
