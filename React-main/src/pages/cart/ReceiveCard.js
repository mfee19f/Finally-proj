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

  // 存入錯誤訊息用
  const [fieldErrors, setFieldErrors] = useState({
    receiver: '請填入姓名',
    mobile: '請輸入手機號碼',
    password: '',
    card: '請填入正確卡號', 
    delivery_address: '請填入地址',
    three: '末三碼',
    year: '年',
    mon: '月',
  })

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

  // 當整個表單有變動時觸發
  // 認定使用者正在輸入有錯誤的欄位
  // 清除某個欄位錯誤訊息
  const handleFormChange = (e) => {
    // 設定錯誤訊息狀態
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: '',
    }

    // 3. 設定回原錯誤訊息狀態物件
    setFieldErrors(updatedFieldErrors)
  }

  // 當表單有檢查有不合法出現時觸發
  const handleFormInvalid = (e) => {
    // 阻擋form的預設行為(泡泡訊息)
    e.preventDefault()

    // 設定錯誤訊息狀態
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    }

    // 3. 設定回原錯誤訊息狀態物件
    setFieldErrors(updatedFieldErrors)
  }
  const handleSubmit = (e) => {
    // 阻擋form的預設送出行為
    e.preventDefault()
  }
  useEffect(() => {
    // 先開起載入指示器
    setIsLoading(true)
    // 3秒後關閉指示器
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])
  console.log('datacarddatacarddatacarddatacard', datacard)
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
      <form
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        onInvalid={handleFormInvalid}
      >
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
              <div name="form1" class="ml-5 col-12">
                <div class="form-group">
                  <label
                    for="receiver"
                    className="rong-fix2"
                  >
                    收件人 :
                  </label>
                  <input
                    type="text"
                    class="form-control col-4 inputstyle"
                    placeholder="姓名"
                    name="receiver"
                    value={datacard.receiver}
                    onChange={handleFieldChange}
                    minlength="3"
                    required
                  />
                  {fieldErrors.receiver !== '' && (
                    <div className="error mt-1 ml-1">
                      {fieldErrors.receiver}
                    </div>
                  )}
                </div>
                <div class="form-group">
                  <label
                    for="exampleInputEmail1"
                    className="rong-fix2"
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
                    min="10"
                  />
                  {fieldErrors.mobile !== '' && (
                    <div className="error mt-1 ml-1">
                      {fieldErrors.mobile}
                    </div>
                  )}
                </div>
                <div class="form-group">
                  <label
                    for="exampleInputEmail1"
                    className="rong-fix2"
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
                  {fieldErrors.delivery_address !== '' && (
                    <div className="error mt-1 ml-1">
                      {fieldErrors.delivery_address}
                    </div>
                  )}
                </div>
                <div class="form-group">
                  <label
                    for="exampleInputEmail1"
                    className="rong-fix2"
                  >
                    備註說明 :
                  </label>
                  <br />
                  <textarea
                  placeholder="說明..."
                    class="inputstyle p-2"
                    name="into"
                    id="into"
                    cols="84"
                    rows="10"
                    value={datacard.into}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-5 pt-5">
          <div class="d-flex justify-content-center">
            <div class="w875 borderbottom">
              <p className="rong-fix2">
                Payment Options 請選擇卡別
              </p>
            </div>
          </div>
        </div>
        <div class="container pt-5">
          <div class="d-flex justify-content-center">
            <div class="w875 ">
              <div class="form-group ml-5 visa">
                <div name="form2">
                  <label for="name" className="rong-fix2">
                    信用卡:
                  </label>
                  <input class="ml-5" type="radio" />
                  <img src="./image/visa.png" alt="" />
                  <span className="rocky-fix4">
                    <img src="./image/JCB.jpeg" alt="" />
                  </span>
                  <input class="ml-5 mr-2" type="radio" />
                  <img src="./image/UnionPay.png" alt="" />
                  <div>
                    <label
                      for="name"
                      className="rong-fix2"
                    >
                      信用卡號 :
                    </label>
                    <input
                      type="number"
                      class="form-control col-8 inputstyle"
                      placeholder="卡號 16位數字"
                      name="card"
                      value={datacard.card}
                      onChange={handleFieldChange}
                      required
                    />
                    {fieldErrors.card !== '' && (
                    <div className="error mt-1 ml-1">
                      {fieldErrors.card}
                    </div>
                  )}
                  </div>
                </div>
              </div>
              <div class="d-flex mr-2 year">
                <div class="col-2 ">
                  <label for="name" className="rong-fix2">
                    月 :
                  </label>
                  <input
                    name="mon"
                    type="number"
                    class="form-control  "
                    placeholder=""
                    value={datacard.mon}
                    onChange={handleFieldChange}
                  />
                  {fieldErrors.mon !== '' && (
                    <div className="error mt-1 ml-1">
                      {fieldErrors.mon}
                    </div>
                  )}
                </div>
                <div class="col-2 ">
                  <label for="name" className="rong-fix2">
                    年 :
                  </label>
                  <input
                    name="year"
                    type="number"
                    class="form-control "
                    placeholder=""
                    value={datacard.year}
                    onChange={handleFieldChange}
                  />
                  {fieldErrors.year !== '' && (
                    <div className="error mt-1 ml-1">
                      {fieldErrors.year}
                    </div>
                  )}
                </div>
                <div class="col-2">
                  <label for="name" className="rong-fix2">
                    末三碼 :
                  </label>
                  <input
                    name="three"
                    type="number"
                    class="form-control "
                    min="3"
                    placeholder=""
                    value={datacard.three}
                    onChange={handleFieldChange}
                  />
                  {fieldErrors.three !== '' && (
                    <div className="error mt-1 ml-1">
                      {fieldErrors.three}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-5 pt-5">
          <div class="d-flex justify-content-center">
            <div class="w875 borderbottom">
              <p className="rong-fix2">
                Invoice 請選擇發票格式
              </p>
            </div>
          </div>
        </div>
        <div class="container pt-5">
          <div class="d-flex justify-content-center">
            <div class="w875 ">
              <div class="form-group ml-5">
                <label for="name" className="rong-fix2">
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
                  className="rong-fix2 rocky-fix4"
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
        {/* <button type="submit">檢查 </button> */}
      </form>
    </>
  )
  return <>{isLoading ? loading : display}</>
}

export default Receive
