import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import './Login.css'
function Login(props) {
  // console.log(props)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const { setAuth, setMemberData } = props
  // alert需要的狀態
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
          )
          handleShow()
        } else {
          alert('帳號或密碼錯誤\n' + (obj.error || ''))
        }
      })
    setAuth(true)
  }

  const handleSubmit = (e) => {
    //阻擋FORM 預設送出行為
    e.preventDefault()
    login()
  }

  function getMemberLocalStorage() {
    const newMember = localStorage.getItem('member') || '[]'

    // console.log(JSON.parse(newMember))

    setMemberData(JSON.parse(newMember))
  }
  useEffect(() => {
    getMemberLocalStorage()
  }, [])

  // 登入提示訊息
  const messageModal = (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>歡迎回來！</Modal.Title>
      </Modal.Header>
      <Modal.Body>已成功登入</Modal.Body>
      <Modal.Footer>
        <a href="/">
          <Button
            variant="secondary"
            // onClick={() => {
            //   props.history.push('/')
            // }}
          >
            <span className="rocky-fix">到首頁</span>
          </Button>
        </a>
        <a href="/order-steps">
        <Button
          // variant="primary"
          // onClick={() => {
          //   props.history.push('/order-steps')
          // }}
        >
          前往購物車
        </Button>
        </a>
      </Modal.Footer>
    </Modal>
  )
  const errorModal = (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>註冊成功</Modal.Title>
      </Modal.Header>
      <Modal.Body>你好</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            props.history.push('/login')
          }}
        >
          前往登入頁
        </Button>
      </Modal.Footer>
    </Modal>
  )
  return (
    <>
      {messageModal}
      <div className="d-flex  mt-5">
        <div className="loginLeft col-xl-6 d-none d-xl-block mt-5">
          <img src="./image/login_left_pic.jpg" alt="" />
        </div>
        <div className="loginRight col-xl-4 col-12">
          <form name="form1" onSubmit={handleSubmit}>
            <h4 className="pt-5 pl-5 font-weight-bold">
              歡迎 !
            </h4>
            <div className="mb-3 pl-5 mt-5 ">
              <label
                htmlFor="account"
                className="form-label mb-3"
              >
                帳號{' '}
              </label>
              <input
                type="email"
                className="form-control col-8"
                id="account"
                name="account"
                value={account}
                onChange={(e) => {
                  setAccount(e.target.value)
                }}
              />
            </div>
            <div className="mb-3  pl-5 mt-5">
              <label
                htmlFor="password"
                className="form-label mb-3"
              >
                密碼
              </label>
              <input
                type="password"
                className="form-control col-8"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className="mb-3 form-check ml-4">
              <input
                type="radio"
                className="rememberAccount"
              />
              <label
                className="form-check-label"
                htmlFor="exampleCheck1"
              >
                記住帳號
              </label>
            </div>
            <div className="d-flex loginButtonGroup mt-5 ml-5">
              <div className="loginButton">
                <button
                  type="submit"
                  className="login btn btn-primary"
                  variant="primary"
                  // onClick={login}
                >
                  登入
                </button>
              </div>
              <div className="registerButton ml-3">
                <button
                  className="login btn btn-primary"
                  onClick={() => {
                    props.history.push('/register')
                  }}
                >
                  註冊
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withRouter(Login)
