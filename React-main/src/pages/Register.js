import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import './Register.css'
function Register(props) {
  console.log(props)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const { auth } = props

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
    add()
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
        <div className="loginRight  col-xl-4 col-12">
          <form onSubmit={handleSubmit} name="form1">
            <h4 className="pt-5 pl-5 font-weight-bold">
              註冊個人帳戶
            </h4>
            <div className="mb-3 pl-5 mt-5">
              <label
                htmlFor="email"
                className="form-label mb-3"
              >
                帳號(Email信箱)
              </label>
              <input
                type="email"
                className="form-control col-8"
                id="email"
                name="account"
                min="3"
                required
                value={account}
                onChange={(e) => {
                  setAccount(e.target.value)
                }}
              />
            </div>
            <div className="mb-3 pl-5 mt-5">
              <label
                htmlFor="password"
                className="form-label mb-3"
              >
                建立密碼 (6~8位數)
              </label>
              <input
                type="password"
                className="form-control col-8"
                id="password"
                name="password"
                minLength="6"
                maxLength="8"
                required
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
                className="form-check-label "
                htmlFor="exampleCheck1"
              >
                我同意XX條款
              </label>
            </div>
            <div className="registerButton">
              <button
                type="submit"
                className="login btn btn-primary mt-4 ml-5"
                // onClick={add}
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
