import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Cart(props) {
  const { cartCount, setCartCount } = props
  const [mycart, setMycart] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [mycartDisplay, setMycartDisplay] = useState([])

  function getCartFromLocalStorage() {
    // 開啟載入的指示圖示
    setDataLoading(true)
    const newCart = localStorage.getItem('cart') || '[]'
    setMycart(JSON.parse(newCart))
  }

  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  // 每次mycart資料有改變，1秒後關閉載入指示
  // componentDidUpdate
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

    // console.log('index:', index)
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
  // 更新購物車 list中的商品數量
  const updateListToLocalStorage = (
    item,
    isAdded = true
  ) => {
    // console.log(item, isAdded)
    const currentList =
      JSON.parse(localStorage.getItem('list')) || []

    // find if the product in the localstorage with its id
    const index = currentList.findIndex(
      (v) => v.id === item.id
    )

    // console.log('index:', index)
    // found: index! == -1
    if (index > -1) {
      isAdded
        ? currentList[index].amount++
        : currentList[index].amount--
    }

    localStorage.setItem(
      'list',
      JSON.stringify(currentList)
    )
  }
  const deleteCartToLocalStorage = (item) => {
    const currentCart =
      JSON.parse(localStorage.getItem('cart')) || []

    const index = currentCart.findIndex(
      (v) => v.id === item.id
    )
    currentCart.splice(index, 1)
    // console.log('index', index)

    localStorage.setItem(
      'cart',
      JSON.stringify(currentCart)
    )

    // 設定資料
    setMycart(currentCart)
    setCartCount(cartCount - 1)

    const currentList =
      JSON.parse(localStorage.getItem('list')) || []

    const Listindex = currentList.findIndex(
      (v) => v.id === item.id
    )
    currentList.splice(Listindex, 1)
    // console.log('index', index)

    localStorage.setItem(
      'list',
      JSON.stringify(currentList)
    )
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
      <div className="container mb-5">
        <div className="row">
          <p className="ml-3">
            <Link to="/" className="mr-1">
              首頁
            </Link>
            /
            <Link to="/product" className="mr-1 ml-1">
              產品
            </Link>
            /
            <span className="myfontcolor">
              確認購買明細
            </span>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between ">
          <div className="rongboxborder rongboxbg">
            <p className="rongtextcolor">確認購買明細</p>
          </div>
          <div className="rongboxborder">
            <p className="rocky-fix2"> 配送與付款方式</p>
          </div>
          <div className="rongboxborder">
            <p className="rocky-fix2">填寫收件資料</p>
          </div>
          <div className="rongboxborder">
            <p className="rocky-fix2">確認訂單</p>
          </div>
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
            <table className="table col">
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
                  <th scope="col" className="text-center">
                    刪除
                  </th>
                </tr>
              </thead>
              <tbody>
                {mycartDisplay.map((item, i) => {
                  return (
                    <tr key={i}>
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
                      <td className="text-center">
                        <div className=" mt-4">
                          <i
                            style={{
                              fontSize: '0.5rem',
                              marginRight: '10px',
                              color: '#1d3124',
                            }}
                            onClick={() => {
                              if (item.amount === 1) return
                              updateCartToLocalStorage(
                                item,
                                false
                              )
                              if (item.amount === 1) return
                              updateListToLocalStorage(
                                item,
                                false
                              )
                            }}
                            className="fas fa-caret-square-left"
                          ></i>
                          <span className="">
                            {item.amount}
                          </span>
                          <i
                            style={{
                              fontSize: '0.5rem',
                              marginLeft: '10px',
                              color: '#1d3124',
                            }}
                            onClick={() => {
                              updateCartToLocalStorage(
                                item,
                                true
                              )
                              updateListToLocalStorage(
                                item,
                                true
                              )
                            }}
                            className="fas fa-caret-square-right"
                          ></i>
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
                      <td className="text-center">
                        <div className=" mt-4">
                          <i
                            style={{ color: '#e59560' }}
                            onClick={() =>
                              deleteCartToLocalStorage(item)
                            }
                            className="fas fa-trash"
                          ></i>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container mt-1  w875 ">
        <div className="row justify-content-end rongtotal ml-auto mr-1 pt-1 rongmoney2">
          <div className="rongsettotal">
            <p className="rocky-fix2">總計</p>
          </div>
          <div className="rongsettotal">
            <span>NT ${parseInt(sum(mycartDisplay))}</span>
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
    </>
  )

  // 以資料載入的指示狀態來切換要出現的畫面
  return dataLoading ? loading : display
}

export default Cart
