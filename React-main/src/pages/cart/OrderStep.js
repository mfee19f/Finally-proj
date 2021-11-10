import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import './cartstyle.css'
import Cart from './Cart'
import Transport from './Transport'
import ReceiveCard from './ReceiveCard'
import CheckOrder from './CheckOrder'

function OrderSteps(props) {
  const { auth } = props
  const [member, setMember] = useState([])
  const [datacard, setDatacard] = useState({})
  const [paydata, setPaydata] = useState()
  const [totalMoney, setTotalMoney] = useState(0)
  const [mycart, setMycart] = useState([])
  const [step, setStep] = useState(1)
  const [mycartDisplay, setMycartDisplay] = useState([])
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //運費
  const [freight, setFreight] = useState(0)

  const cart = (
    <>
      {/* <h2>購物車</h2> */}
      <Cart />
    </>
  )
  const transport = (
    <>
      {/* <h2>運送表單</h2> */}
      <Transport
        setPaydata={setPaydata}
        setTotalMoney={setTotalMoney}
        freight={freight}
        setFreight={setFreight}
      />
    </>
  )
  const receiveCard = (
    <>
      {/* <h2>付款表單</h2> */}
      <ReceiveCard setDatacard={setDatacard} />
    </>
  )
  const orderDetail = (
    <>
      {/* <h2>訂購詳細</h2> */}
      <CheckOrder
        paydata={paydata}
        datacard={datacard}
        totalMoney={totalMoney}
        freight={freight}
      />
    </>
  )

  function getMemberLocalStorage() {
    const newMember = localStorage.getItem('member') || '[]'
    setMember(JSON.parse(newMember))
  }
  function getCartFromLocalStorage() {
    const newCart = localStorage.getItem('cart') || '[]'
    setMycart(JSON.parse(newCart))
  }
  useEffect(() => {
    getCartFromLocalStorage()
    getMemberLocalStorage()
  }, [])
  const fetchOrderDetail = async () => {
    const r = await fetch(
      'http://localhost:3001/order_detail',
      {
        method: 'POST',
        body: JSON.stringify({
          orderDetail: mycartDisplay,
          order_id: datacard.order_id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const orderDetail = await r.json()
  }
  const fetchOrder = async () => {
    const dataObj = {
      member_sid: member.sid,
      order_sid: datacard.order_id,
      nickname: member.name,
      mobile: datacard.mobile,
      orderprice: totalMoney,
      delivery: paydata,
      receiver: datacard.receiver,
      delivery_address:
        '新北市板橋區' + datacard.delivery_address,
      card: datacard.card,
    }
    const r = await fetch('http://localhost:3001/order', {
      method: 'POST',
      body: JSON.stringify(dataObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const orderData = await r.json()
  }
  const onSubmit = () => {
    fetchOrder()
    fetchOrderDetail()
    localStorage.removeItem('cart')
    handleShow()
    // props.history.push('/')
  }
  const switchStep = (step) => {
    switch (step) {
      case 1:
        return cart
      case 2:
        return transport
      case 3:
        return receiveCard
      case 4:
        return orderDetail
      default:
        return cart
    }
  }
  const changeStep = (isAdded = true) => {
    if (isAdded && step < 4) setStep(step + 1)
    if (!isAdded && step > 1) setStep(step - 1)
  }

  const login = (
    <>
      <div className="mt-5 "></div>
      <div className="mb-5">
        {switchStep(step)}
        <div class="container">
          <div class="row justify-content-center">
            {step !== 1 && (
              <button
                className="btn"
                onClick={() => {
                  changeStep(false)
                }}
              >
                上一步
              </button>
            )}
            {step !== 4 && (
              <button
                className="btn"
                onClick={() => {
                  changeStep(true)
                }}
              >
                下一步
              </button>
            )}
            {step === 4 && (
              <button className="btn" onClick={onSubmit}>
                送出
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
  const myalert = (
    <>
      <Modal show="true" backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>您未登錄</Modal.Title>
        </Modal.Header>
        <Modal.Body>請先登入</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              props.history.push('/login')
            }}
          >
            前往登入頁面
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
  const messageModal = (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>感謝您的支持</Modal.Title>
      </Modal.Header>
      <Modal.Body>已成功完成購買</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.history.push('/')
          }}
        >
          回首頁
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.history.push('/product')
          }}
        >
          我還要購買
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <>
      {auth ? login : myalert}
      {messageModal}
    </>
  )
}

export default withRouter(OrderSteps)
