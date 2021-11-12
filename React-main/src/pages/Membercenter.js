import React, { useState, useEffect } from 'react'
// import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import conf, {
  IMG_PATH,
  UPLOAD_AVATAR,
  TEST_AVATAR,
} from './config'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import './Membercenter.css'
function Member_center(props) {
  console.log(props)
  const [memberData, setMemberData] = useState({})
  const [password, setPassword] = useState('')

  console.log(
    'memberDatamemberDatamemberDatamemberDatamemberData',
    memberData
  )
  const { auth, setAuth } = props
  let [imgSrc, setImgSrc] = useState('')
  let [myName, setMyName] = useState('')

  useEffect(() => {
    ;(async () => {
      const r = await fetch(TEST_AVATAR + '/2')
      const obj = await r.json()
      setMyName(obj.name)
      setImgSrc(obj.avatar)
    })()
  }, [])

  const doUpload = async () => {
    const fd = new FormData(document.formup)
    const r = await axios.post(UPLOAD_AVATAR, fd)

    console.log(r.data)
    setImgSrc(r.data.filename)
  }

  const mySubmit = async (e) => {
    e.preventDefault()

    // ****** 修改 ******
    const r = await fetch(TEST_AVATAR + '/id', {
      method: 'PUT',
      body: new FormData(document.fake_form),
    })
    const data = await r.json()
    console.log(data)
  }

  const add = () => {
    // TODO: 欄位檢查

    const fd = new FormData(document.form1)
    const id = props.match.params.id
    // 以 urlencoded 的格式送出
    fetch('http://localhost:3001/member/' + id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(fd).toString(),
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(JSON.stringify(obj, null, 4))
        if (obj.success) {
          alert('修改成功')
        } else {
          alert('資料無法新增成功\n' + (obj.error || ''))
        }
      })
  }
  const id = props.match.params.id
  useEffect(() => {
    ;(async () => {
      const id = props.match.params.id

      if (id) {
        const r = await fetch(
          'http://localhost:3001/member/' + id
        )
        const obj = await r.json()
        await setMemberData(obj.data)

        console.log('obj================data', obj.data)
      }
    })()
  }, [props.match.params.id])

  console.log('auth', auth)
  const handleSubmit = (e) => {
    //阻擋FORM 預設送出行為
    e.preventDefault()
  }

  const handleFieldChange = (e) => {
    // 1. 從原本的狀態物件拷貝新物件
    // 2. 在拷貝的新物件上處理
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
    const updatedFields = {
      ...memberData,
      [e.target.name]: e.target.value,
    }
    // 3. 設定回原狀態物件
    setMemberData(updatedFields)
  }
  return (
    <>
      <div className="member_center d-flex ">
        <div className="centerLeft col-2 ">
          <div className="personalArea  mt-5 pt-1 ">
            <img
              className="personalAreaPic"
              src={
                imgSrc
                  ? IMG_PATH + '/' + imgSrc
                  : IMG_PATH + '/default-avatar.png'
              }
              alt=""
            />
            <div>
              <label className="rongcolor" for="">{memberData.name}</label>
              <br />
              <a href="" className="rongcolor">編輯個人資料</a>
            </div>

            <div></div>
          </div>

          <div className="functionList">
            <div className="orderTrack ml-4">
              <label for="orderTrack" className="rongcolor">
                <Link to={'/order-list/' + id}>
                  訂單查詢
                </Link>
              </label>
            </div>
          </div>
        </div>
        <div className="centerRight col-10">
          <div className="personalForm ml-5 pl-5 mt-5">
            <h4 className="font-weight-bold rongcolor">個人資料</h4>

            <div className="personalFormLine"></div>
            <form name="form1" onSubmit={handleSubmit}>
             
              <div className="form-group password mt-4">
                <label for="name" className="rongcolor">帳號 :</label>
                <input
                  name="password"
                  type="text"
                  className="form-control col-4 inputstyle"
                  value={memberData.account}
                  disabled
                  // $2a$10$EueNGRr0woJujuwkQcrZDetEGg4unlPIFYKr1ElfZNinCXW4uh5MC
                />
              </div>
              <div className="form-group password">
                <label for="name" className="rongcolor">密碼 :</label>
                <input
                  name="password"
                  type="password"
                  className="form-control col-4 inputstyle"
                  value="$2a$10$Ur601.zytpHQgfvCASbQXONbLf7SXgIsmGu4bykPUbk6QSzCmrP3O"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  // $2a$10$EueNGRr0woJujuwkQcrZDetEGg4unlPIFYKr1ElfZNinCXW4uh5MC
                />
              </div>
              <div className="form-group mobile">
                <label for="name" className="rongcolor">姓名 :</label>
                <input
                  type="text"
                  class="form-control col-4 inputstyle"
                  id="name"
                  name="name"
                  required
                  value={memberData.name}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="form-group mobile">
                <label for="mobile" className="rongcolor">手機 :</label>
                <input
                  type="text"
                  class="form-control col-4 inputstyle"
                  id="mobile"
                  name="mobile"
                  required
                  value={memberData.mobile}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="form-group birthday">
                <label for="birthday" className="rongcolor">生日 :</label>
                <input
                  type="date"
                  class="form-control col-4 inputstyle"
                  id="birthday"
                  name="birthday"
                  required
                  value={dayjs(memberData.birthday).format(
                    'YYYY-MM-DD'
                  )}
                  onChange={handleFieldChange}
                />
              </div>

            

              <div className="avatar">
                <label for="avatar" className="avatar rongcolor">
                  個人照片:
                </label>
                <br />
                <form name="fake_form" onSubmit={mySubmit}>
                  <img
                    src={
                      imgSrc
                        ? IMG_PATH + '/' + imgSrc
                        : IMG_PATH + '/default-avatar.png'
                    }
                    alt=""
                    width="200px"
                    height="200px"
                    id="img01"
                  />
                  <button
                    type="button"
                    className="btn btn-success ml-5 rongcolor"
                    onClick={(e) =>
                      document
                        .querySelector('#avatar')
                        .click()
                    }
                  >
                    選擇大頭貼
                  </button>

                  <input
                    type="hidden"
                    className="form-control"
                    name="avatar"
                    value={imgSrc}
                  />
                  {/* <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    確認更改
                  </button> */}
                </form>
                <form
                  name="formup"
                  style={{ display: 'none' }}
                >
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={doUpload}
                  />
                </form>
              </div>
              <button
                type="submit"
                class="btn btn-primary mt-5  "
                onClick={add}
              >
                修改
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Member_center)
