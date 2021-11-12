import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
function Edit(props) {
  console.log(props)
  const [memberData, setMemberData] = useState({})
  console.log(
    'memberDatamemberDatamemberDatamemberDatamemberData',
    memberData
  )
  const { auth } = props
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
      <div className="card-body">
        <h5 className="card-title">註冊 (JWT)</h5>
        {/* email, password, mobile, address,birthday */}
        <form name="form1" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="email" className="form-label">
              email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              value={memberData.email}
              onChange={handleFieldChange}
            />
          </div>

          <div className="mb-3">
            <label for="password" className="form-label">
              密碼
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              value={memberData.password}
              onChange={handleFieldChange}
            />
          </div>

          <div className="mb-3">
            <label for="mobile" className="form-label">
              mobile
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              name="mobile"
              required
              value={memberData.mobile}
              onChange={handleFieldChange}
            />
          </div>

          <div className="mb-3">
            <label for="password" className="form-label">
              address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              required
              value={memberData.address}
              onChange={handleFieldChange}
            />
          </div>

          <div className="mb-3">
            <label for="password" className="form-label">
              birthday
            </label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              required
              value={memberData.birthday}
              onChange={handleFieldChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={add}
          >
            修改
          </button>
          {/* <button className="btn btn-primary" onClick={logout}>
            登出
          </button> */}
        </form>
      </div>
    </>
  )
}

export default withRouter(Edit)
