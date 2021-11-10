import React, { useState, useEffect } from 'react'
import './cartstyle.css'
import { withRouter, Link } from 'react-router-dom'

function Transport(props) {
  const [dataLoading, setDataLoading] = useState(false)
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  // 付款方式
  const [pay, setPay] = useState('')
  // 下拉選單 運送地區
  const [selectedOption, setSelectedOption] = useState('')
  function getCartFromLocalStorage() {
    // 開啟載入的指示圖示
    setDataLoading(true)

    const newCart = localStorage.getItem('cart') || '[]'

    // console.log(JSON.parse(newCart))

    setMycart(JSON.parse(newCart))
  }

  useEffect(() => {
    getCartFromLocalStorage()
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

  // 更新購物車中的商品數量
  const updateCartToLocalStorage = (
    item,
    isAdded = true
  ) => {
    // console.log(item, isAdded)
    const currentCart =
      JSON.parse(localStorage.getItem('cart')) || []

    // find if the product in the localstorage with its id
    const index = currentCart.findIndex(
      (v) => v.id === item.id
    )

    // console.log('index', index)
    // found: index! == -1
    if (index > -1) {
      isAdded
        ? currentCart[index].amount++
        : currentCart[index].amount--
    }

    localStorage.setItem(
      'cart',
      JSON.stringify(currentCart)
    )

    // 設定資料
    setMycart(currentCart)
  }

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
      <div className="container mt-5 pt-5 mb-5 pb-5">
        <div className="row">
          <p>
            {' '}
            <Link to="/" className="mr-1">
              HOME{' '}
            </Link>
            /
            <Link to="/" className="mr-1 ml-1">
              商品{' '}
            </Link>{' '}
            /{' '}
            <span className="myfontcolor">
              配送與付款方式
            </span>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between ">
          <div className="rongboxborder ">
            <p>確認購買明細</p>
          </div>
          <div className="rongboxborder rongboxbg">
            <p className="rongtextcolor"> 配送與付款方式</p>
          </div>
          <div className="rongboxborder">
            <p>填寫收件資料</p>
          </div>
          <div className="rongboxborder">
            <p>確認訂單</p>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-center">
          <div className="w875 borderbottom">
            <p>Delivery 配送與付款方式</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="rongproducttype d-flex .select">
            <p className="mt-1">運送區域 : </p>
            <select
              className="ml-3 p-1  form-select form-select-lg mb-3 rongbodybg"
              aria-label=".form-select-lg example"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value)
              }}
            >
              <option value="">請選擇</option>
              <option value="台灣及離島">台灣及離島</option>
              <option value="日本">日本</option>
              <option value="韓國">韓國</option>
              <option value="中國大陸">中國大陸</option>
            </select>
            <p className="ml-5 mt-1">運費 : </p>
            <select
              className="ml-3 p-1  form-select form-select-lg mb-3 rongbodybg"
              aria-label=".form-select-lg example"
              value={props.freight}
              onChange={(e) => {
                props.setFreight(e.target.value)
              }}
            >
              <option value="">請選擇</option>
              <option value="200">郵局 $200</option>
              <option value="250">快遞 $250</option>
            </select>
          </div>
          {/* <div className="rongproducttype d-flex .select rongradiostyle">
            <input
              className="mt-2"
              type="radio"
              name="delivery"
              value="購物金全額折抵"
            />
            <label for="">
              <p>
                購物金全額折抵{' '}
                <span>
                  {' '}
                  全館消費可享免運(特價商品金額不列入免運優惠計算)
                </span>
              </p>
            </label>
          </div> */}

          <div className="rongproducttype d-flex .select rongradiostyle">
            <input
              className="mt-2"
              type="radio"
              name="delivery"
              value="宅配到貨付款"
              checked={pay === '宅配到貨付款'}
              onChange={(e) => {
                setPay(e.target.value)
              }}
            />
            <label for="">
              <p>
                宅配到貨付款{' '}
                <span>
                  {' '}
                  全館消費可享免運(特價商品金額不列入免運優惠計算)
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
              checked={pay === '7-11超商取貨'}
              onChange={(e) => {
                setPay(e.target.value)
              }}
            />
            <label for="">
              <p>
                7-11超商取貨付款{' '}
                <span>
                  {' '}
                  全館消費可享免運(特價商品金額不列入免運優惠計算)
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
              checked={pay === '信用卡'}
              onChange={(e) => {
                setPay(e.target.value)
              }}
            />
            <label for="">
              <p>
                信用卡線上刷卡{' '}
                <span>
                  {' '}
                  全館消費可享免運(特價商品金額不列入免運優惠計算)
                </span>
              </p>
            </label>
          </div>
        </div>
        <div className="container mt-5 pt-5">
          <div className="d-flex justify-content-center">
            <div className="w875 borderbottom">
              <p>CHECK YOUR ORDER 確認購買明細</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="rongproducttype d-flex">
              <table className="table  col ">
                <thead className="table-dark">
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
                      <>
                        <tr>
                          <td className="d-flex">
                            <div>
                              <img
                                src={item.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-5 mt-4">
                              {item.name}
                            </div>
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
                          {/* {console.log(localStorage)} */}
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="container mt-5 pt-4 w875 ">
            <div className="row justify-content-end rongtotal">
              <div className="mr-5  pr-2">
                <p className>總金額</p>
                <p className="rong mr-1">運費</p>
                <p>購物金</p>
              </div>
              <div className="ml-5 mr-2">
                <p>NT.{sum(mycartDisplay)}</p>
                <p>NT.{props.freight}</p>
                <p>NT.0</p>
              </div>
            </div>
            <div className="row justify-content-end rongtotal ml-auto mr-2 pt-3 rongmoney">
              <div className="mr-5 rongsettotal ">
                <p>應付金額</p>
              </div>
              <div className="ml-5  rongsettotal">
                <span
                  onClick={() => {
                    props.setPaydata(pay)
                    props.setTotalMoney(
                      parseInt(sum(mycartDisplay)) +
                        parseInt(props.freight)
                    )
                  }}
                >
                  NT.
                  {parseInt(sum(mycartDisplay)) +
                    parseInt(props.freight)}
                </span>
              </div>
            </div>
          </div>

          {/* <div className="container mt-5 pt-4">
          <div className="row justify-content-center ">
            <button className="btn">
              <span>下一步</span>
            </button>
          </div>
        </div> */}
        </div>
      </div>
      <div className="mb-5"></div>
    </>
  )
  return <>{dataLoading ? spinner : display}</>
}

export default Transport
