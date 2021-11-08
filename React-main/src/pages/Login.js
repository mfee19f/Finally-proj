import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
function Login(props) {
  console.log(props)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const { auth, setAuth, memberData, setMemberData } = props
  console.log(
    'memberDatapppp@kkkk.compppp@kkkk.compppp@kkkk.compppp@kkkk.com',
    memberData
  )
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

          props.history.push('/')
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

  const handleSubmit = (e) => {
    //阻擋FORM 預設送出行為
    e.preventDefault()
  }

  function getMemberLocalStorage() {
    const newMember = localStorage.getItem('member') || '[]'

    // console.log(JSON.parse(newMember))

    setMemberData(JSON.parse(newMember))
  }
  useEffect(() => {
    getMemberLocalStorage()
  }, [])
  return (
    <>
      <div className="d-flex mt-5">
        <div className="loginLeft col-xl-6 d-none d-xl-block mt-5">
          <img src="./image/login_left_pic.jpg" alt="" />
        </div>
        <div className="loginRight col-xl-6 col-12">
          <form name="form1" onSubmit={handleSubmit}>
            <p>
              歡迎!
              <br />
              登入帳戶
            </p>
            <div className="mb-3">
              <label for="account" className="form-label">
                帳號(Email address)
              </label>
              <input
                type="email"
                class="form-control"
                id="account"
                name="account"
                required
                value={account}
                onChange={(e) => {
                  setAccount(e.target.value)
                }}
              />
              <div id="emailHelp" className="form-text">
                提示字
              </div>
            </div>
            <div className="mb-3">
              <label
                for="exampleInputPassword1"
                className="form-label"
              >
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
            <div className="mb-3 form-check">
              <input
                type="radio"
                className="rememberAccount"
              />
              <label
                className="form-check-label"
                for="exampleCheck1"
              >
                記住帳號
              </label>
            </div>
            <div className="loginButtonGroup">
              <div className="loginButton">
                <button
                  type="submit"
                  className="login btn btn-primary"
                  variant="primary"
                  onClick={login}
                >
                  登入
                </button>
              </div>
              <div className="registerButton">
                <button className="register btn btn-success">
                  註冊
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ................ */}
      {/* <div class="card-body">
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
      </div> */}

      {/* .................. */}
    </>
  )
}

export default withRouter(Login)
