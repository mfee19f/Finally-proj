import React, { useState } from 'react'

function Error(props) {
  // 使用物件值作為狀態值，儲存所有欄位的值
  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // 有可能只是在瀏覽器檢查用而已
    intro: '',
    gender: '',
    likeList: [],
  })

  // 存入錯誤訊息用
  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // 有可能只是在瀏覽器檢查用而已
  })

  // radio - 專用元件
  // RadioButton元件有修改
  const genderOptions = ['男', '女', '不提供', '不確定']
  // checkbox - 專用元件
  // CheckBox 元件有修改
  const fruitOptions = ['芒果', '西瓜', '芭樂', '香蕉']

  // 專門用來處理每個欄位的輸入用
  const handleFieldChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const type = e.target.type

    // 預設值為輸入值
    let newValue = value

    // checkbox為陣列值
    if (type === 'checkbox') {
      // toggle 切換
      // 如果目前包含在這狀態陣列 -> 移出 / 如果沒包含在這狀態陣列中 -> 加入
      newValue = fields[name].includes(value)
        ? fields[name].filter((v, i) => {
            return v !== value
          })
        : [...fields[name], value]
    }

    // 1. 從原本的狀態物件拷貝新物件 / 2. 在拷貝的新物件上處理
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E5%90%8D
    const updatedFields = {
      ...fields,
      [name]: newValue,
    }

    // 3. 設定回原狀態物件
    setFields(updatedFields)
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

  // 在 表單完成驗証 之後，才會觸發
  const handleSubmit = (e) => {
    // 阻擋form的預設送出行為
    e.preventDefault()

    // 利用FormData Api 得到各欄位的值 or 利用狀態值
    // FormData 利用的是表單元素的 name
    const formData = new FormData(e.target)
    console.log(formData.get('username'))
    console.log(formData.get('email'))
    console.log(formData.get('password'))
    console.log(formData.get('intro'))
    console.log(formData.get('gender')) //只需要一個值
    console.log(formData.getAll('likeList')) //需要所有值

    // 檢查確認密碼&密碼欄位
    if (
      formData.get('password') !==
      formData.get('confirmPassword')
    ) {
      // 設定錯誤訊息狀態
      const updatedFieldErrors = {
        ...fieldErrors,
        password: '密碼與確認密碼欄位輸入值不相同',
        confirmPassword: '密碼與確認密碼欄位輸入值不相同',
      }

      // 3. 設定回原錯誤訊息狀態物件
      setFieldErrors(updatedFieldErrors)

      // 不送出資料到伺服器
      return
    }

    // ex. 以下用fetch api/axios送到伺服器
  }

  return (
    <>
      <h1>HTML5表單驗証</h1>
      <form
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        onInvalid={handleFormInvalid}
      >
        <label>帳號</label>
        <input
          type="text"
          name="username"
          value={fields.username}
          onChange={handleFieldChange}
          required
        />
        {fieldErrors.username !== '' && (
          <div className="error">
            {fieldErrors.username}
          </div>
        )}
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={fields.email}
          onChange={handleFieldChange}
          required
        />
        {fieldErrors.email !== '' && (
          <div className="error">{fieldErrors.email}</div>
        )}
        <br />
        <label>密碼</label>
        <input
          type="text"
          name="password"
          value={fields.password}
          onChange={handleFieldChange}
          required
          minLength="5"
        />
        {fieldErrors.password !== '' && (
          <div className="error">
            {fieldErrors.password}
          </div>
        )}
        <br />
        <label>確認密碼</label>
        <input
          type="text"
          name="confirmPassword"
          value={fields.confirmPassword}
          onChange={handleFieldChange}
          required
          minLength="5"
        />
        {fieldErrors.confirmPassword !== '' && (
          <div className="error">
            {fieldErrors.confirmPassword}
          </div>
        )}
        <br />
        <label>簡歷</label>
        <textarea
          name="intro"
          value={fields.intro}
          onChange={handleFieldChange}
        />
        <br />

        <br />
        <button type="submit">提交</button>
      </form>
    </>
  )
}

export default Error
