import { withRouter } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './cartstyle.css'
import Cart from './Cart'
import Transport from './Transport'
// import Receive from './pages/Receive'
import ReceiveCard from './ReceiveCard'
// import OrderList from './pages/OrderList'
import CheckOrder from './CheckOrder'

function OrderSteps(props) {
  const { auth } = props
  const [member, setMember] = useState([])
  const [datacard, setDatacard] = useState({})
  const [paydata, setPaydata] = useState()
  const [mycart, setMycart] = useState([])
  const [step, setStep] = useState(1)
  const [mycartDisplay, setMycartDisplay] = useState([])
  console.log('mycartDisplay:', mycartDisplay)
  var temporderid = 0
  const cart = (
    <>
      {/* <h2>購物車</h2> */}
      <Cart />
    </>
  )

  const shippingForm = (
    <>
      {/* <h2>運送表單</h2> */}
      <Transport setPaydata={setPaydata} />
    </>
  )

  const paymentForm = (
    <>
      {/* <h2>付款表單</h2> */}
      <ReceiveCard setDatacard={setDatacard} />
    </>
  )

  const orderDetail = (
    <>
      {/* <h2>訂購詳細</h2> */}
      <CheckOrder paydata={paydata} datacard={datacard} />
    </>
  )

  function getMemberLocalStorage() {
    // 開啟載入的指示圖示

    const newMember = localStorage.getItem('member') || '[]'

    // console.log(JSON.parse(newMember))

    setMember(JSON.parse(newMember))
  }
  function getCartFromLocalStorage() {
    // 開啟載入的指示圖示

    const newCart = localStorage.getItem('cart') || '[]'

    // console.log(JSON.parse(newCart))

    setMycart(JSON.parse(newCart))
  }
  // 計算總價用的函式
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }
  useEffect(() => {
    getCartFromLocalStorage()
    getMemberLocalStorage()
  }, [])
  const fetchOrderDetail = async () => {
    const productr = await fetch(
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
    const productdata = await productr.json()
  }
  const fetchOrder = async () => {
    const dataObj = {
      member_sid: member.sid,
      order_sid: datacard.order_id,
      nickname: member.name,
      mobile: datacard.mobile,
      orderprice: sum(mycartDisplay),
      delivery: paydata,
      receiver: datacard.receiver,
      delivery_address: datacard.delivery_address,
      card: datacard.card,
    }
    const r = await fetch('http://localhost:3001/order', {
      method: 'POST',
      body: JSON.stringify(dataObj),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const orderdata = await r.json()
  }
  const onSubmit = () => {
    fetchOrder()
    fetchOrderDetail()
    localStorage.removeItem('cart')
    alert('謝謝惠顧')
    props.history.push('/about')
  }
  const f = () => {
    {
      alert('請先登入')
      props.history.push('/login')
    }
  }
  useEffect(() => {
    // mycartDisplay運算
    let newMycartDisplay = []

    //尋找mycartDisplay
    for (let i = 0; i < mycart.length; i++) {
      //尋找mycartDisplay中有沒有此mycart[i].id
      //有找到會返回陣列成員的索引值
      //沒找到會返回-1
      const index = newMycartDisplay.findIndex(
        (value) => value.id === mycart[i].id
      )
      //有的話就數量+1
      if (index !== -1) {
        //每次只有加1個數量
        //newMycartDisplay[index].amount++
        //假設是加數量的
        newMycartDisplay[index].amount += mycart[i].amount
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }

    // console.log(newMycartDisplay)
    setMycartDisplay(newMycartDisplay)
  }, [mycart])

//請先登入
  useEffect(() => {
    if (!auth) {
      f()
    }
  }, [])
  const switchStep = (step) => {
    switch (step) {
      case 1:
        return cart
      case 2:
        return shippingForm
      case 3:
        return paymentForm
      case 4:
        return orderDetail
      default:
        return cart
    }
  }
  {
    // console.log('datacard:', datacard)
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
            {step == 4 && (
              <button className="btn" onClick={onSubmit}>
                送出
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
  const logout = (
    <>
      <div className="mt-5 pt-5"></div>
      <p>請先登入</p>
    </>
  )
  return auth ? login : logout
}

export default withRouter(OrderSteps)
