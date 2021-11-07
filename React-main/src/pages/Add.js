import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
function Add(props) {
  console.log(props)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [birthday, setBirthday] = useState('')
  const [address, setAddress] = useState('')
  const { auth, setAuth } = props

  const add = () => {
    // TODO: 欄位檢查

    const fd = new FormData(document.form1)

    // 以 urlencoded 的格式送出
    fetch('http://localhost:3001/member', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(fd).toString(),
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(JSON.stringify(obj, null, 4))
        if (obj.success) {
          alert('註冊成功')
        } else {
          alert('資料無法新增成功\n' + (obj.error || ''))
        }
      })
  }

  console.log('auth', auth)
  const handleSubmit = (e) => {
    //阻擋FORM 預設送出行為
    e.preventDefault()
  }

  
  return (
    <>
      <div class="card-body">
        <h5 class="card-title">註冊 (JWT)</h5>
        {/* email, password, mobile, address,birthday */}
        <form name="form1" onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="email" class="form-label">
              email
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">
              密碼
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>

          <div class="mb-3">
            <label for="mobile" class="form-label">
              mobile
            </label>
            <input
              type="text"
              class="form-control"
              id="mobile"
              name="mobile"
              required
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value)
              }}
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">
              address
            </label>
            <input
              type="text"
              class="form-control"
              id="address"
              name="address"
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
              }}
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">
              birthday
            </label>
            <input
              type="date"
              class="form-control"
              id="birthday"
              name="birthday"
              required
              value={birthday}
              onChange={(e) => {
                setBirthday(e.target.value)
              }}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={add}
          >
            註冊
          </button>
          {/* <button class="btn btn-primary" onClick={logout}>
            登出
          </button> */}
        </form>
      </div>
    </>
  )
}

export default withRouter(Add)
