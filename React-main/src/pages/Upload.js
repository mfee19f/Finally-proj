// import logo from './logo.svg';

import { useEffect, useState } from 'react'
import conf, {
  IMG_PATH,
  UPLOAD_AVATAR,
  TEST_AVATAR,
} from './config'
import axios from 'axios'

function Upload() {
  let [imgSrc, setImgSrc] = useState('')
  let [myName, setMyName] = useState('')
  console.log({ conf })

  useEffect(() => {
    ;(async () => {
      const r = await fetch(TEST_AVATAR + '/2')
      const obj = await r.json()
      setMyName(obj.name)
      setImgSrc(obj.avatar)
    })()
  }, [])

  const doUpload = async () => {
    const fd = new FormData(document.form1)
    const r = await axios.post(UPLOAD_AVATAR, fd)

    console.log(r.data)
    setImgSrc(r.data.filename)
  }

  const mySubmit = async (e) => {
    e.preventDefault()

    // ****** 修改 ******
    const r = await fetch(TEST_AVATAR + '/2', {
      method: 'PUT',
      body: new FormData(document.fake_form),
    })
    const data = await r.json()
    console.log(data)
  }

  return (
    <>
      <form name="fake_form" onSubmit={mySubmit}>
        <img
          src={
            imgSrc
              ? IMG_PATH + '/' + imgSrc
              : IMG_PATH + '/default-avatar.png'
          }
          alt=""
          width="300px"
          id="img01"
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={(e) =>
            document.querySelector('#avatar').click()
          }
        >
          上傳大頭貼
        </button>

        <input
          type="hidden"
          className="form-control"
          name="avatar"
          value={imgSrc}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <form name="form1" style={{ display: 'none' }}>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={doUpload}
        />
      </form>
    </>
  )
}

export default Upload
