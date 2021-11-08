import React, { useState, useEffect } from 'react'
import Address from './Address'
import { withRouter, Link } from 'react-router-dom'

import './cartstyle.css'

function Receive(props) {
  // 發票資訊
  const [receipt, setReceipt] = useState('')
  //載入
  const [isLoading, setIsLoading] = useState(true)
  // 使用物件值作為狀態值，儲存所有欄位的值
  var Today = new Date()
  var date =
    Today.getFullYear() +
    '-' +
    (Today.getMonth() + 1) +
    '-' +
    Today.getDate()
  var date2 =
    Today.getFullYear() +
    '' +
    (Today.getMonth() + 1) +
    '' +
    Today.getDate() +
    ''
  var rnd = Math.floor(Math.random() * 1000)
  const [fields, setFields] = useState({
    receiver: '',
    mobile: '',
    delivery_address: '台北市',
    card: '',
    date: date,
    order_id: date2 + rnd,
  })
  // console.log()
  // 專門用來處理每個欄位的輸入用
  const handleFieldChange = (e) => {
    // 1. 從原本的狀態物件拷貝新物件
    // 2. 在拷貝的新物件上處理
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
    const updatedFields = {
      ...fields,
      [e.target.name]: e.target.value,
    }
    // 3. 設定回原狀態物件
    setFields(updatedFields)
  }

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
      <div class="container mt-5 pt-5 mb-5 pb-5">
        <div class="row">
          <p className="ml-3">
          <Link to="/" className="mr-1">HOME </Link>/
            <Link to="/" className="mr-1 ml-1">商品 </Link> / <span className="myfontcolor">填寫收件資料</span>
          </p>
        </div>
      </div>
      <div class="container">
        <div class="d-flex justify-content-between ">
          <div class="rongboxborder ">
            <p>確認購買明細</p>
          </div>
          <div class="rongboxborder">
            <p> 配送與付款方式</p>
          </div>
          <div class="rongboxborder rongboxbg">
            <p class="rongtextcolor">填寫收件資料</p>
          </div>
          <div class="rongboxborder">
            <p>確認訂單</p>
          </div>
        </div>
      </div>
      <div class="container mt-5 pt-5">
        <div class="row justify-content-center">
          <div class="w875 borderbottom">
            <p>DELIVERY INFORMATION 請填寫收件資料</p>
          </div>
        </div>
      </div>
      <div class="container pt-5">
        <div class="row justify-content-center ">
          <div class="w875 ">
            <form name="form1" class="ml-5 col-12">
              <div class="form-group">
                <label for="receiver">收件姓名 :</label>
                <input
                  type="text"
                  class="form-control col-4 inputstyle"
                  placeholder="姓名"
                  name="receiver"
                  value={fields.receiver}
                  onChange={handleFieldChange}
                  required
                />
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">
                  手機號碼 :
                </label>
                <input
                  type="number"
                  class="form-control col-4 inputstyle"
                  placeholder="手機"
                  name="mobile"
                  value={fields.mobile}
                  onChange={handleFieldChange}
                  required
                />
              </div>

              <div class="form-group">
                <label for="exampleInputEmail1">
                  收貨地址 :
                </label>
                <div className="form-inline"></div>
                <div class="d-flex">
                  <Address />
                  {/* <select class="form-control col-4 mr-4 ">
                    <option selected>-請選擇縣市-</option>
                    <option>...</option>
                  </select>
                  <select class="form-control col-4 ml-5">
                    <option selected>-請選擇區域-</option>
                    <option>...</option>
                  </select> */}
                </div>
                <input
                  class="form-control col-9 mt-3"
                  type="text"
                  placeholder="地址"
                  name="delivery_address"
                  value={fields.delivery_address}
                  onChange={handleFieldChange}
                  required
                ></input>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">
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
            <p>PAYMENT OPTIONS 請選擇卡別</p>
          </div>
        </div>
      </div>

      <div class="container pt-5">
        <div class="d-flex justify-content-center">
          <div class="w875 ">
            <div class="form-group ml-5 visa">
              <form name="form2">
                <label for="name">信用卡: </label>
                <input
                  class="ml-5"
                  type="radio"
                  placeholder="姓名"
                />
                <img src="./image/visa_PNG36.png" alt="" />
                <img src="./image/JCBLOGO.jfif" alt="" />
                <input
                  class="ml-5 mr-2"
                  type="radio"
                  placeholder="姓名"
                />
                <img src="./image/unionpaylogo.jfif" alt="" />
                <div>
                  <label for="name">信用卡號 :</label>
                  <input
                    type="number"
                    class="form-control col-8 inputstyle"
                    placeholder="卡號"
                    name="card"
                    value={fields.card}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div class="d-flex mr-2 year">
              <div class="col-2 ">
                <label for="name">月 :</label>
                <input
                  type="number"
                  class="form-control  "
                  placeholder="月"
                />
              </div>
              <div class="col-2 ">
                <label for="name">年 :</label>
                <input
                  type="number"
                  class="form-control "
                  placeholder="年"
                />
              </div>
              <div class="col-2">
                <label for="name">末三碼 :</label>
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
            <p>RECEIPT 請選擇發票格式</p>
          </div>
        </div>
      </div>

      <div class="container pt-5">
        <div class="d-flex justify-content-center">
          <div class="w875 ">
            <div class="form-group ml-5">
              <label
                for="name"
                onClick={() => {
                  props.setDatacard(fields)
                }}
              >
                發票資訊 :{' '}
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
              />
              <label for="">電子發票</label>
              <input
                class="ml-5"
                type="radio"
                placeholder="姓名"
                value="公司索取電子發票證明聯"
                checked={
                  receipt === '公司索取電子發票證明聯'
                }
                onChange={(e) => {
                  setReceipt(e.target.value)
                }}
              />
              <label for="">公司索取電子發票證明聯</label>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5 pt-4">
        {/* <div class="row justify-content-center ">
        <button class="btn">
          <span>
            重新選擇
            <br />
            付款方式
          </span>
        </button>
        <button class="btn">
          <span>確認購買</span>
        </button>
      </div> */}
      </div>

      <div className="mb-5"></div>
    </>
  )
  return <>{isLoading ? spinner : display}</>
}

export default Receive
