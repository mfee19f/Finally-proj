import React, { useState, useEffect } from 'react'
import './cartstyle.css'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

function Transport(props) {
  const {
    paydata,
    setPaydata,
    setTotalMoney,
    freight,
    setFreight,
  } = props
  const [dataLoading, setDataLoading] = useState(false)
  const [mycart, setMycart] = useState([])
  // 多餘的狀態
  const [mycartDisplay, setMycartDisplay] = useState([])
  // 運送地區下拉選單
  const [selectedOption, setSelectedOption] = useState('')

  function getCartFromLocalStorage() {
    // 開啟載入的指示圖示
    setDataLoading(true)
    const newCart = localStorage.getItem('cart') || '[]'
    setMycart(JSON.parse(newCart))
  }
  function getFreightFromLocalStorage() {
    const newFreight = localStorage.getItem('freight') || 0
    setFreight(JSON.parse(newFreight))
  }
  function getPaydataFromLocalStorage() {
    const newPaydata = localStorage.getItem('paydata') || ''
    setPaydata(newPaydata)
  }
  function getSelectedOptionFromLocalStorage() {
    const newSelectedOption =
      localStorage.getItem('selectedOption') || ''
    setSelectedOption(newSelectedOption)
  }
  useEffect(() => {
    getCartFromLocalStorage()
    getFreightFromLocalStorage()
    getPaydataFromLocalStorage()
    getSelectedOptionFromLocalStorage()
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
  useEffect(() => {
    const sum = (items) => {
      let total = 0
      for (let i = 0; i < items.length; i++) {
        total += items[i].amount * items[i].price
      }
      return total
    }
    setTotalMoney(
      parseInt(sum(mycartDisplay)) + parseInt(freight)
    )
  }, [mycartDisplay, freight, setTotalMoney])

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
  console.log(
    'selectedOptionselectedOptionselectedOptionselectedOption',
    selectedOption
  )
  const display = (
    <>
      <div className="container mb-5 pb-5">
        <div className="row">
          <p>
            <Link to="/" className="mr-1">
              首頁
            </Link>
            /
            <Link to="/product" className="mr-1 ml-1">
              產品
            </Link>
            /
            <span className="myfontcolor">
              配送與付款方式
            </span>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between ">
          <div className="rongboxborder rocky-fix2">
            <p>確認購買明細</p>
          </div>
          <div className="rongboxborder rongboxbg">
            <p className="rongtextcolor"> 配送與付款方式</p>
          </div>
          <div className="rongboxborder rocky-fix2">
            <p>填寫收件資料</p>
          </div>
          <div className="rongboxborder rocky-fix2">
            <p>確認訂單</p>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-center">
          <div className="w875 borderbottom">
            <p className="rocky-fix2">
              Delivery and Payment 配送與付款方式
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="rongproducttype d-flex .select">
            <p className="mt-1 rocky-fix2">運送區域 : </p>

            <select
              className="ml-3 p-1  form-select form-select-lg mb-3 rongbodybg"
              aria-label=".form-select-lg example"
              checked={selectedOption}
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value)
                localStorage.setItem(
                  'selectedOption',
                  e.target.value
                )
              }}
            >
              <option value="">請選擇</option>
              <option value="台灣及離島">台灣及離島</option>
              <option value="日本">日本</option>
              <option value="韓國">韓國</option>
              <option value="中國大陸">中國大陸</option>
            </select>
            <p className="ml-5 mt-1 rocky-fix2">運費 : </p>
            <select
              className="ml-3 p-1  form-select form-select-lg mb-3 rongbodybg"
              aria-label=".form-select-lg example"
              checked={freight}
              value={freight}
              onChange={(e) => {
                setFreight(e.target.value)
                localStorage.setItem(
                  'freight',
                  JSON.stringify(e.target.value)
                )
              }}
            >
              <option value="">請選擇</option>
              <option value="200">郵局 $200</option>
              <option value="250">快遞 $250</option>
            </select>
          </div>
          <div className="rongproducttype d-flex .select rongradiostyle">
            <input
              className="mt-2"
              type="radio"
              name="delivery"
              value="宅配到貨付款"
              checked={paydata === '宅配到貨付款'}
              onChange={(e) => {
                setPaydata(e.target.value)
                localStorage.setItem(
                  'paydata',
                  JSON.stringify(e.target.value)
                )
              }}
            />
            <label htmlFor="">
              <p className="rocky-fix2">
                宅配到貨付款
                <span>
                  (特價商品金額不列入免運優惠計算)
                </span>
              </p>
            </label>
          </div>
          <div className="rongproducttype d-flex .select rongradiostyle">
            <input
              className="mt-2"
              type="radio"
              name="delivery"
              value="7-11超商取貨"
              checked={paydata === '7-11超商取貨'}
              onChange={(e) => {
                setPaydata(e.target.value)
                localStorage.setItem(
                  'paydata',
                  e.target.value
                )
              }}
            />
            <label htmlFor="">
              <p className="rocky-fix2">
                7-11超商取貨付款
                <span>
                  (特價商品金額不列入免運優惠計算)
                </span>
              </p>
            </label>
          </div>
          <div className="rongproducttype d-flex .select rongradiostyle">
            <input
              className="mt-2"
              type="radio"
              name="delivery"
              value="信用卡"
              checked={paydata === '信用卡'}
              onChange={(e) => {
                setPaydata(e.target.value)
                localStorage.setItem(
                  'paydata',
                  e.target.value
                )
              }}
            />
            <label htmlFor="">
              <p className="rocky-fix2">
                信用卡線上刷卡
                <span>
                  (特價商品金額不列入免運優惠計算)
                </span>
              </p>
            </label>
          </div>
        </div>
        <div className="container mt-5 pt-5">
          <div className="d-flex justify-content-center">
            <div className="w875 borderbottom">
              <p className="rocky-fix2">
                Check Your Order 確認購買明細
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="rongproducttype d-flex">
              <table className="table  col ">
                <thead className="table-dark rocky-fix3">
                  <tr>
                    <th scope="col">商品名稱</th>
                    <th scope="col" className="text-center">
                      尺寸
                    </th>
                    <th scope="col" className="text-center">
                      數量
                    </th>
                    <th scope="col" className="text-center">
                      單價
                    </th>
                    <th scope="col" className="text-center">
                      小計
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mycartDisplay.map((item, index) => {
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
                        <td className="text-center rocky-fix2">
                          <div className=" mt-4">
                            {item.size}
                          </div>
                        </td>
                        <td className="text-center rocky-fix2">
                          <div className=" mt-4">
                            {item.amount}
                          </div>
                        </td>
                        <td className="text-center mt-4 rocky-fix2">
                          <div className=" mt-4">
                            NT$ {item.price}
                          </div>
                        </td>
                        <td className="text-center rocky-fix2">
                          <div className=" mt-4">
                            NT$ {item.amount * item.price}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="container mt-5 pt-4 w875 ">
            <div className="row justify-content-end rongtotal">
              <div className="mr-5  pr-2">
                <p className="rocky-fix2">總金額</p>
                <p className="rocky-fix2">運費</p>
              </div>
              <div className="ml-5 mr-2">
                <p className="rocky-fix2">
                  NT$ {sum(mycartDisplay)}
                </p>
                <p className="rocky-fix2">NT$ {freight}</p>
              </div>
            </div>
            <div className="row justify-content-end rongtotal ml-auto mr-2 pt-1 rongmoney">
              <div className="mr-3 rongsettotal">
                <p className="rocky-fix2">總計</p>
              </div>
              <div className="rongsettotal">
                <span>
                  NT$
                  {parseInt(sum(mycartDisplay)) +
                    parseInt(freight)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
    </>
  )
  return <>{dataLoading ? loading : display}</>
}

export default Transport
