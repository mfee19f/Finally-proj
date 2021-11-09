import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import './Register.css'
function Register(props) {
  console.log(props)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const { auth, setAuth } = props

  // alert需要的狀態
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
          handleShow()
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
  // alert提示訊息
  const messageModal = (
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
      <div className="d-flex mt-5">
        <div className="loginLeft col-6">
          <img src="./image/login_left_pic.jpg" alt="" />
        </div>
        <div className="loginRight col-6">
          <form onSubmit={handleSubmit} name="form1">
            <p>註冊個人帳戶</p>
            <div className="mb-3">
              <label for="email" className="form-label">
                Email信箱
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
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
              <label for="password" className="form-label">
                建立密碼
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
                我同意XX條款
              </label>
            </div>
            <div className="registerButton">
              <button
                className="register btn"
                onClick={add}
              >
                註冊帳號
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withRouter(Register)
