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
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
      <div className="container mb-5 pb-5">
        <div className="row">
          <p className="ml-3">
            <Link to="/" className="mr-1">
              首頁
            </Link>
            /
            <Link to="/" className="mr-1 ml-1">
              產品
            </Link>
            / <span className="myfontcolor">確認訂單</span>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between ">
          <div className="rongboxborder ">
            <p className="rocky-fix2">確認購買明細</p>
          </div>
          <div className="rongboxborder">
            <p className="rocky-fix2"> 配送與付款方式</p>
          </div>
          <div className="rongboxborder">
            <p className="rocky-fix2">填寫收件資料</p>
          </div>
          <div className="rongboxborder rongboxbg">
            <p className="rongtextcolor">確認訂單</p>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-center">
          <div className="w875 borderbottom">
            <p className="rocky-fix2">
              Check Your Order 詳細訂單
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="borderstyle w875">
            <div className="rongorder">詳細訂單</div>
            <table className="table  col ">
              <thead className="">
                <tr>
                  <th scope="col" className="rocky-fix2">
                    商品資訊
                  </th>
                  <th
                    scope="col"
                    className="text-center rocky-fix2"
                  >
                    尺寸
                  </th>
                  <th
                    scope="col"
                    className="text-center rocky-fix2"
                  >
                    數量
                  </th>
                  <th
                    scope="col"
                    className="text-center rocky-fix2"
                  >
                    單價
                  </th>
                  <th
                    scope="col"
                    className="text-center rocky-fix2"
                  >
                    小計
                  </th>
                </tr>
              </thead>
              <tbody>
                {mycart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="d-flex">
                        <div>
                          <img src={item.image} alt="" />
                        </div>
                        <div className="ml-5 mt-4 rocky-fix2">
                          {item.name}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className=" mt-4 rocky-fix2">
                          {item.size}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className=" mt-4 rocky-fix2">
                          {item.amount}
                        </div>
                      </td>
                      <td className="text-center mt-4">
                        <div className=" mt-4 rocky-fix2">
                          NT$ {item.price}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className=" mt-4 rocky-fix2">
                          NT$ {item.amount * item.price}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="borderbottom"></div>
            <div className="container    w875 mt-5 mb-5 mr-3">
              <div className="row justify-content-end rongtotal pr-5">
                <div className="mr-5  pr-2">
                  <p className="rocky-fix2">總金額</p>
                  <p className="rocky-fix2">運費</p>
                </div>
                <div className="ml-5 mr-2 rocky-fix2">
                  <p>NT$ {sum(mycartDisplay)}</p>
                  <p>NT$ {props.freight}</p>
                </div>
              </div>
              <div className="row justify-content-end rongtotal ml-auto mr-2 pt-3 rongmoney pr-4">
                <div className="mr-3 rongsettotal ">
                  <p className="rocky-fix2">總計</p>
                </div>
                <div className="rongsettotal">
                  <div className="rocky-fix2 rocky-fix5">
                    NT$ {props.totalMoney}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-3">
          <div className="row justify-content-center ">
            <div className="w875">
              <form className="ml-5 rongorderdetail">
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    會員帳號 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {member.account}
                  </span>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    會員暱稱 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {member.name}
                  </span>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    訂單編號 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {props.fields.order_id}
                  </span>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    訂購日期 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {props.fields.date}
                  </span>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    付款方式 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {props.paydata}
                  </span>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    收件人姓名 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {props.datacard.receiver}
                  </span>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    收件人手機 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {props.datacard.mobile}
                  </span>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    收件人地址 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {'新北市板橋區' +
                      props.datacard.delivery_address}
                  </span>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="rocky-fix2 rocky-fix7"
                  >
                    信用卡號 :{' '}
                  </label>
                  <span className="rocky-fix6">
                    {props.datacard.card}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <div className="container mt-5 pt-4">
          <div className="row justify-content-center ">
            <button className="btn">
              <span>送出</span>
            </button>
          </div>
        </div> */}
      </div>
      <div className="mb-5"></div>
    </>
  )

  return <>{dataLoading ? loading : display}</>
}

export default CheckOrder
