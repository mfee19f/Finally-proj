import React, { useState, useEffect } from 'react'
import './cartstyle.css'
// import './.../public/img/pd.jpg'
function Cart1(props) {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    // 先開起載入指示器
    setIsLoading(true)

    // 模擬和伺服器要資料
    // 最後設定到狀態中
    // setStudents(data)

    // 3秒後關閉指示器
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])

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
      <div className="container mt-5 pt-5 mb-5 pb-5 ">
        <div className="row">
          <p className="ml-3">
            {' '}
            HOME / 商品 / 確認購買明細
          </p>
        </div>
      </div>
      <div className="container">
        <div className="d-flex justify-content-between ">
          <div className="rongboxborder rongboxbg">
            <p className="rongtextcolor">確認購買明細</p>
          </div>
          <div className="rongboxborder">
            <p> 配送與付款方式</p>
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
                  <th scope="col" className="text-center">
                    刪除
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="d-flex">
                    <div>
                      <img src="./img/pd.jpg" alt="" />
                    </div>
                    <div className="ml-5">
                      Bumblebee Cans
                    </div>
                  </td>
                  <td className="text-center">
                    黃 over 100cm{' '}
                  </td>
                  <td className="text-center">1</td>
                  <td className="text-center">200</td>
                  <td className="text-center">200</td>
                  <td className="text-center">
                    <i className="fas fa-trash"></i>
                  </td>
                </tr>
                <tr>
                  <td className="d-flex">
                    <div>
                      <img src="./img/pd.jpg" alt="" />
                    </div>
                    <div className="ml-5">
                      Bumblebee Cans
                    </div>
                  </td>
                  <td className="text-center">
                    黃 over 100cm{' '}
                  </td>
                  <td className="text-center">1</td>
                  <td className="text-center">200</td>
                  <td className="text-center">200</td>
                  <td className="text-center">
                    <i className="fas fa-trash"></i>
                  </td>
                </tr>
                <tr>
                  <td className="d-flex">
                    <div>
                      <img src="./img/pd.jpg" alt="" />
                    </div>
                    <div className="ml-5">
                      Bumblebee Cans
                    </div>
                  </td>
                  <td className="text-center">
                    黃 over 100cm{' '}
                  </td>
                  <td className="text-center">1</td>
                  <td className="text-center">200</td>
                  <td className="text-center">200</td>
                  <td className="text-center">
                    <i className="fas fa-trash"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="container mt-5 pt-4">
        <div className="row justify-content-center">
          <p>小計金額 ( 共3件 )</p>
        </div>
      </div>
      {/* <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <button className="btn">
          <span>繼續購物</span>
        </button>
        <button className="btn">
          <span>結帳</span>
        </button>
      </div>
    </div> */}
      <div className="mb-5"></div>
    </>
  )

  return <>{isLoading ? spinner : display}</>
}

export default Cart1
