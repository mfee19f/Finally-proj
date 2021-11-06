import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
function Login(props) {
  console.log(props)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { auth, setAuth } = props

  const login = () => {
    const fd = new FormData(document.form1)
    fetch('http://localhost:3001/login-jwt', {
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
          localStorage.setItem('token', obj.token) // 儲存到 localStorage
          localStorage.setItem(
            'member',
            JSON.stringify(obj.member)
          ) // 儲存到 localStorage
          alert('登入成功')
        } else {
          alert('登入失敗\n' + (obj.error || ''))
        }
      })
    setAuth(true)
  }
  const logout = () => {
    localStorage.removeItem('member')
    alert('以登出')
  }
  console.log('auth', auth)
  const handleSubmit = (e) => {
    //阻擋FORM 預設送出行為
    e.preventDefault()
  }
  return (
    <>
      <div class="card-body">
        <h5 class="card-title">登入 (JWT)</h5>

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

          <button
            type="submit"
            class="btn btn-primary"
            onClick={login}
          >
            登入
          </button>
          <button class="btn btn-primary" onClick={logout}>
            登出
          </button>
        </form>
      </div>
    </>
  )
}

export default withRouter(Login)
