import React, { useState, useEffect } from 'react'
import './cartstyle.css'
import { Link } from 'react-router-dom'

function CheckOrder(props) {
  const [dataLoading, setDataLoading] = useState(false)
  const [member, setMember] = useState([])
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])

  function getMemberLocalStorage() {
    // 開啟載入的指示圖示
    setDataLoading(true)
    const newMember = localStorage.getItem('member') || '[]'
    setMember(JSON.parse(newMember))
  }
  function getCartFromLocalStorage() {
    // 開啟載入的指示圖示
    setDataLoading(true)
    const newCart = localStorage.getItem('cart') || '[]'
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

  const loading = (
    <>
      <div classNameName="d-flex justify-content-center">
        <div classNameName="spinner-border" role="status">
          <span classNameName="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
      <div class="container mb-5 pb-5">
        <div class="row">
          <p className="ml-3">
            <Link to="/" className="mr-1">
              首頁
            </Link>
            /
            <Link to="/" classNameName="mr-1 ml-1">
              產品
            </Link>
            /{' '}
            <span classNameName="myfontcolor">
              確認訂單
            </span>
          </p>
        </div>
      </div>
      <div class="container">
        <div class="d-flex justify-content-between ">
          <div class="rongboxborder ">
            <p className="rocky-fix2">確認購買明細</p>
          </div>
          <div class="rongboxborder">
            <p className="rocky-fix2"> 配送與付款方式</p>
          </div>
          <div class="rongboxborder">
            <p className="rocky-fix2">填寫收件資料</p>
          </div>
          <div class="rongboxborder rongboxbg">
            <p class="rongtextcolor">確認訂單</p>
          </div>
        </div>
      </div>
      <div class="container mt-5 pt-5">
        <div class="d-flex justify-content-center">
          <div class="w875 borderbottom">
            <p className="rocky-fix2">
              Check Your Order 詳細訂單
            </p>
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
                  <th
                    scope="col"
                    classNameName="rocky-fix2"
                  >
                    商品資訊
                  </th>
                  <th
                    scope="col"
                    class="text-center rocky-fix2"
                  >
                    尺寸
                  </th>
                  <th
                    scope="col"
                    class="text-center rocky-fix2"
                  >
                    數量
                  </th>
                  <th
                    scope="col"
                    class="text-center rocky-fix2"
                  >
                    單價
                  </th>
                  <th
                    scope="col"
                    class="text-center rocky-fix2"
                  >
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
                        <div class="ml-5 mt-4 rocky-fix2">
                          {item.name}
                        </div>
                      </td>
                      <td classNameName="text-center">
                        <div classNameName=" mt-4 rocky-fix2">
                          {item.size}
                        </div>
                      </td>
                      <td classNameName="text-center">
                        <div classNameName=" mt-4 rocky-fix2">
                          {item.amount}
                        </div>
                      </td>
                      <td classNameName="text-center mt-4">
                        <div classNameName=" mt-4 rocky-fix2">
                          NT$ {item.price}
                        </div>
                      </td>
                      <td classNameName="text-center">
                        <div classNameName=" mt-4 rocky-fix2">
                          NT$ {item.amount * item.price}
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
                  <p className="rocky-fix2">總金額</p>
                  <p class="rocky-fix2">運費</p>
                </div>
                <div class="ml-5 mr-2 rocky-fix2">
                  <p>NT$ {sum(mycartDisplay)}</p>
                  <p>NT$ {props.freight}</p>
                </div>
              </div>
              <div class="row justify-content-end rongtotal ml-auto mr-2 pt-3 rongmoney pr-4">
                <div class="mr-3 rongsettotal ">
                  <p className="rocky-fix2">總計</p>
                </div>
                <div class="rongsettotal">
                  <div className="rocky-fix2 rocky-fix5">
                    NT$ {props.totalMoney}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container pt-3">
          <div class="row justify-content-center ">
            <div class="w875">
              <form class="ml-5 rongorderdetail">
                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    會員帳號 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {member.account}
                  </span>
                </div>
                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    會員暱稱 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {member.name}
                  </span>
                </div>
                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    訂單編號 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {props.fields.order_id}
                  </span>
                </div>
                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    訂購日期 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {props.fields.date}
                  </span>
                </div>
                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    付款方式 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {props.paydata}
                  </span>
                </div>

                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    收件人姓名 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {props.datacard.receiver}
                  </span>
                </div>
                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    收件人手機 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {props.datacard.mobile}
                  </span>
                </div>
                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    收件人地址 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {'新北市板橋區' +
                      props.datacard.delivery_address}
                  </span>
                </div>
                <div class="form-group">
                  <label
                    for="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    信用卡號 :{' '}
                  </label>
                  <span classNameName="rocky-fix6">
                    {props.datacard.card}
                  </span>
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
      <div classNameName="mb-5"></div>
    </>
  )

  return <>{dataLoading ? loading : display}</>
}

export default CheckOrder
