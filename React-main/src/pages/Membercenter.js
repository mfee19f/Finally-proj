import React, { useState, useEffect } from 'react'
// import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'

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
      <div className="member_center d-flex mt-5">
        <div className="centerLeft col-2">
          <div className="personalArea">
            <img
              className="personalAreaPic"
              src="./image/IMG_6685.PNG"
              alt=""
            />
            <div>
              <label for="">{memberData.name}</label>
              <br />
              <a href="">編輯個人資料</a>
            </div>

            <div></div>
          </div>

          <div className="functionList">
            <div className="orderTrack">
              <label for="orderTrack">
                <Link to={'/order-list/' + id}>
                  訂單查詢
                </Link>
              </label>
            </div>
          </div>
        </div>
        <div className="centerRight col-10">
          <div className="personalForm">
            <b>個人資料</b>
            <br />
            <div className="personalFormLine"></div>
            <form name="form1" onSubmit={handleSubmit}>
              <div className="form-group account">
                <label for="name">
                  帳號(Email address) :
                </label>
                <label name="email">
                  {memberData.account}
                </label>
                <small className="form-text text-muted">
                  此為您的登入帳號
                </small>
              </div>

              <div className="form-group password">
                <label for="name">密碼 :</label>
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
                <small className="form-text text-muted">
                  We'll never share your password with
                  anyone else.
                </small>
              </div>
              <div className="form-group mobile">
                <label for="name">姓名 :</label>
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
                <label for="mobile">手機 :</label>
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
                <label for="birthday">生日 :</label>
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

              <div className="gender">
                <label for="gender" className="gender">
                  性別:
                </label>
                <input
                  type="radio"
                  className="male"
                  name="male"
                />
                <label for="male">男</label>
                <input
                  type="radio"
                  className="female"
                  name="female"
                />
                <label for="female">女</label>
              </div>

              <div className="avatar">
                <label for="avatar" className="avatar">
                  個人照片:
                </label>
                <br />
                <img className="picSize" src="" alt="" />
                <button className="btn avatarUpload btn-success">
                  上傳
                </button>
              </div>
              <button
                type="submit"
                class="btn btn-primary"
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
