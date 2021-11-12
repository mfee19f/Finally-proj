import React, { useState, useEffect } from 'react'
import Address from './Address'
import { Link } from 'react-router-dom'
import './cartstyle.css'

function Receive(props) {
  const { datacard, setDatacard } = props
  // 發票資訊
  const [receipt, setReceipt] = useState('')
  //載入
  const [isLoading, setIsLoading] = useState(true)
  // 使用物件值作為狀態值，儲存所有欄位的值

  // 專門用來處理每個欄位的輸入用
  const handleFieldChange = (e) => {
    // 1. 從原本的狀態物件拷貝新物件
    // 2. 在拷貝的新物件上處理
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
    const updatedFields = {
      ...datacard,
      [e.target.name]: e.target.value,
    }
    // 3. 設定回原狀態物件
    setDatacard(updatedFields)
  }

  useEffect(() => {
    // 先開起載入指示器
    setIsLoading(true)
    // 3秒後關閉指示器
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

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
      <div class="container mb-5 pb-5">
        <div class="row">
          <p className="ml-3">
            <Link to="/" className="mr-1">
              首頁
            </Link>
            /
            <Link to="/" className="mr-1 ml-1">
              產品
            </Link>
            /
            <span className="myfontcolor">
              填寫收件資料
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
          <div class="rongboxborder rongboxbg">
            <p class="rongtextcolor">填寫收件資料</p>
          </div>
          <div class="rongboxborder">
            <p className="rocky-fix2">確認訂單</p>
          </div>
        </div>
      </div>
      <div class="container mt-5 pt-5">
        <div class="row justify-content-center">
          <div class="w875 borderbottom">
            <p className="rocky-fix2">
              Delivery Information 請填寫收件資料
            </p>
          </div>
        </div>
      </div>
      <div class="container pt-5">
        <div class="row justify-content-center ">
          <div class="w875 ">
            <form name="form1" class="ml-5 col-12">
              <div class="form-group">
                <label
                  for="receiver"
                  className="rocky-fix2"
                >
                  收件姓名 :
                </label>
                <input
                  type="text"
                  class="form-control col-4 inputstyle"
                  placeholder="姓名"
                  name="receiver"
                  value={datacard.receiver}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div class="form-group">
                <label
                  for="exampleInputEmail1"
                  className="rocky-fix2"
                >
                  手機號碼 :
                </label>
                <input
                  type="number"
                  class="form-control col-4 inputstyle"
                  placeholder="手機"
                  name="mobile"
                  value={datacard.mobile}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              <div class="form-group">
                <label
                  for="exampleInputEmail1"
                  className="rocky-fix2"
                >
                  收貨地址 :
                </label>
                <div className="form-inline"></div>
                <div class="d-flex">
                  <Address />
                </div>
                <input
                  class="form-control col-9"
                  type="text"
                  placeholder="地址"
                  name="delivery_address"
                  value={datacard.delivery_address}
                  onChange={handleFieldChange}
                  required
                ></input>
              </div>
              <div class="form-group">
                <label
                  for="exampleInputEmail1"
                  className="rocky-fix2"
                >
                  備註說明 :
                </label>
                <br />
                <textarea
                  class="inputstyle"
                  name=""
                  id=""
                  cols="84"
                  rows="10"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="container mt-5 pt-5">
        <div class="d-flex justify-content-center">
          <div class="w875 borderbottom">
            <p className="rocky-fix2">
              Payment Options 請選擇卡別
            </p>
          </div>
        </div>
      </div>
      <div class="container pt-5">
        <div class="d-flex justify-content-center">
          <div class="w875 ">
            <div class="form-group ml-5 visa">
              <form name="form2">
                <label for="name" className="rocky-fix2">
                  信用卡:{' '}
                </label>
                <input class="ml-5" type="radio" />
                <img src="./image/visa_PNG36.png" alt="" />
                <img src="./image/JCBLOGO.jfif" alt="" />
                <input class="ml-5 mr-2" type="radio" />
                <img
                  src="./image/unionpaylogo.jfif"
                  alt=""
                />
                <div>
                  <label for="name" className="rocky-fix2">
                    信用卡號 :
                  </label>
                  <input
                    type="number"
                    class="form-control col-8 inputstyle"
                    placeholder="卡號"
                    name="card"
                    value={datacard.card}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div class="d-flex mr-2 year">
              <div class="col-2 ">
                <label for="name" className="rocky-fix2">
                  月 :
                </label>
                <input
                  type="number"
                  class="form-control  "
                  placeholder="月"
                />
              </div>
              <div class="col-2 ">
                <label for="name" className="rocky-fix2">
                  年 :
                </label>
                <input
                  type="number"
                  class="form-control "
                  placeholder="年"
                />
              </div>
              <div class="col-2">
                <label for="name" className="rocky-fix2">
                  末三碼 :
                </label>
                <input
                  type="number"
                  class="form-control "
                  min="3"
                  placeholder="末三碼"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-5 pt-5">
        <div class="d-flex justify-content-center">
          <div class="w875 borderbottom">
            <p className="rocky-fix2">
              Invoice 請選擇發票格式
            </p>
          </div>
        </div>
      </div>
      <div class="container pt-5">
        <div class="d-flex justify-content-center">
          <div class="w875 ">
            <div class="form-group ml-5">
              <label for="name" className="rocky-fix2">
                發票資訊 :
              </label>
              <input
                class="ml-5"
                type="radio"
                placeholder="姓名"
                value="電子發票"
                checked={receipt === '電子發票'}
                onChange={(e) => {
                  setReceipt(e.target.value)
                }}
                // onClick={() => {
                //  setDatacard(fields)
                // }}
              />
              <label
                for=""
                className="rocky-fix2 rocky-fix4"
              >
                電子發票
              </label>
              <input
                class="ml-5"
                type="radio"
                placeholder="姓名"
                value="三聯式發票/收據"
                checked={receipt === '三聯式發票/收據'}
                onChange={(e) => {
                  setReceipt(e.target.value)
                }}
                // onClick={() => {
                //   setDatacard(fields)
                // }}
              />
              <label
                for=""
                className="rocky-fix2 rocky-fix4"
              >
                三聯式發票/收據
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-5 pt-4"></div>
      <div className="mb-5"></div>
    </>
  )
  return <>{isLoading ? loading : display}</>
}

export default Receive
