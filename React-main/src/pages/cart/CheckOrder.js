import React, { useState, useEffect } from 'react'
import './cartstyle.css'
import { withRouter, Link } from 'react-router-dom'

function CheckOrder(props) {
  // const [isLoading, setIsLoading] = useState(true)

  const [dataLoading, setDataLoading] = useState(false)
  const [member, setMember] = useState([])
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  useEffect(() => {
    setTimeout(() => setDataLoading(false), 1000)

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
    // console.log('props.paydata', props.paydata)
    // console.log(newMycartDisplay)
    setMycartDisplay(newMycartDisplay)
  }, [mycart])
  // console.log('member', member)
  function getMemberLocalStorage() {
    // 開啟載入的指示圖示
    setDataLoading(true)

    const newMember = localStorage.getItem('member') || '[]'

    // console.log(JSON.parse(newMember))

    setMember(JSON.parse(newMember))
  }

  function getCartFromLocalStorage() {
    // 開啟載入的指示圖示
    setDataLoading(true)

    const newCart = localStorage.getItem('cart') || '[]'

    // console.log(JSON.parse(newCart))

    setMycart(JSON.parse(newCart))
  }
  useEffect(() => {
    getCartFromLocalStorage()
    getMemberLocalStorage()
  }, [])
  useEffect(() => {
    setTimeout(() => setDataLoading(false), 1000)

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
  // 計算總價用的函式
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }
  const spinner = (
    <>
      <div
        className="spinner-grow text-primary"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="spinner-grow text-secondary"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div
        className="spinner-grow text-success"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </>
  )

  const display = (
    <>
      <div class="container mt-5 pt-5 mb-5 pb-5">
        <div class="row">
          <p className="ml-3">
            {' '}
            <Link to="/" className="mr-1">
              HOME{' '}
            </Link>
            /
            <Link to="/" className="mr-1 ml-1">
              商品{' '}
            </Link>{' '}
            / <span className="myfontcolor">確認訂單</span>
          </p>
        </div>
      </div>
      <div class="container">
        <div class="d-flex justify-content-between ">
          <div class="rongboxborder ">
            <p class="">確認購買明細</p>
          </div>
          <div class="rongboxborder">
            <p> 配送與付款方式</p>
          </div>
          <div class="rongboxborder">
            <p>填寫收件資料</p>
          </div>
          <div class="rongboxborder rongboxbg">
            <p class="rongtextcolor">確認訂單</p>
          </div>
        </div>
      </div>
      <div class="container mt-5 pt-5">
        <div class="d-flex justify-content-center">
          <div class="w875 borderbottom">
            <p>CHECK YOUR ORDER 詳細訂單</p>
          </div>
        </div>
      </div>
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="borderstyle w875">
            <div class="rongorder">詳細訂單</div>
            <table class="table  col ">
              <thead class="">
                <tr>
                  <th scope="col">商品資訊</th>
                  <th scope="col" class="text-center">
                    尺寸
                  </th>
                  <th scope="col" class="text-center">
                    數量
                  </th>
                  <th scope="col" class="text-center">
                    單價
                  </th>
                  <th scope="col" class="text-center">
                    小計
                  </th>
                </tr>
              </thead>
              <tbody>
                {mycart.map((item, index) => {
                  return (
                    <tr>
                      <td class="d-flex">
                        <div>
                          <img src={item.image} alt="" />
                        </div>
                        <div class="ml-5 mt-4">{item.name}</div>
                      </td>
                      <td className="text-center">
                            <div className=" mt-4">
                              {item.size}
                            </div>
                          </td>
                          <td className="text-center">
                            <div className=" mt-4">
                              {item.amount}
                            </div>
                          </td>
                          <td className="text-center mt-4">
                            <div className=" mt-4">
                              {item.price}
                            </div>
                          </td>
                          <td className="text-center">
                            <div className=" mt-4">
                              {item.amount * item.price}
                            </div>
                          </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div class="borderbottom"></div>
            <div class="container    w875 mt-5 mb-5 mr-3">
              <div class="row justify-content-end rongtotal pr-5">
                <div class="mr-5  pr-2">
                  <p>總金額</p>
                  <p class="rong mr-1">運費</p>
                </div>
                <div class="ml-5 mr-2">
                  <p>NT.{sum(mycartDisplay)}</p>
                  <p>NT.{props.freight}</p>
                </div>
              </div>
              <div class="row justify-content-end rongtotal ml-auto mr-2 pt-3 rongmoney pr-5">
                <div class="mr-5 rongsettotal ">
                  <p>應付金額</p>
                </div>
                <div class="ml-5  rongsettotal">
                  <span>NT.{props.totalMoney}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container pt-5">
          <div class="row justify-content-center ">
            <div class="w875">
              <form class="ml-5 rongorderdetail">
                <div class="form-group">
                  <label for="name">會員帳號 : </label>
                  <span>{member.account}</span>
                </div>
                <div class="form-group">
                  <label for="name">會員暱稱 : </label>
                  <span>{member.name}</span>
                </div>
                <div class="form-group">
                  <label for="name">訂單編號 : </label>
                  <span class="red">
                    {props.datacard.order_id}
                  </span>
                </div>
                <div class="form-group">
                  <label for="name">訂購日期 : </label>
                  <span>{props.datacard.date}</span>
                </div>
                <div class="form-group">
                  <label for="name">付款方式 : </label>
                  <span>{props.paydata}</span>
                </div>

                <div class="form-group">
                  <label for="name">收件人姓名 : </label>
                  <span>{props.datacard.receiver}</span>
                </div>
                <div class="form-group">
                  <label for="name">收件人手機 : </label>
                  <span>{props.datacard.mobile}</span>
                </div>
                <div class="form-group">
                  <label for="name">收件人地址 : </label>
                  <span>
                    {props.datacard.delivery_address}
                  </span>
                </div>
                <div class="form-group">
                  <label for="name">信用卡號 : </label>
                  <span>{props.datacard.card}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div class="container mt-5 pt-4">
          <div class="row justify-content-center ">
            <button class="btn">
              <span>送出</span>
            </button>
          </div>
        </div> */}
      </div>
      <div className="mb-5"></div>
    </>
  )

  return <>{dataLoading ? spinner : display}</>
}

export default CheckOrder
