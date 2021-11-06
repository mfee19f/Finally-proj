import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './cartstyle.css'
// import dayjs from 'dayjs'
function OrderList(props) {
  const [data, setData] = useState({})
  const [singleData, setSingleData] = useState({})
  console.log('datadatadatadatadatadatadatadatadata', data)
  useEffect(() => {
    ;(async () => {
      const id = props.match.params.id

      if (id) {
        const r = await fetch(
          'http://localhost:3001/order/' + id
        )
        const obj = await r.json()
        await setSingleData(obj.data)
        await setData(obj.data)

        console.log('obj================data', obj.data)
      } else {
        const r = await fetch(
          'http://localhost:3001/order/' + 3
        )
        const obj = await r.json()
        await setSingleData(obj.data)
        await setData(obj.data)
      }
    })()
  }, [props.match.params.id])

  return (
    <>
      <div class="container mt-5 pt-4">
        <div class="row justify-content-center rongdash  ml-5 bo "></div>
        <div class="row justify-content-center   ml-5 pr-3">
          <div class="rongorderlist mr-5">
            <p class="mt-3">訂單查詢</p>
          </div>
        </div>
      </div>
      <div class="container mt-5 ">
        {data[0]
          ? data.map((el, i) => {
              return (
                <div class="row justify-content-center mb-5">
                  <div class="borderstyle w875">
                    <div class="rongorder2">
                      訂單編號 :{' '}
                      <span class="red">
                        {el.order_sid}
                      </span>
                    </div>
                    <table class="table table-bordered col ">
                      <thead class="">
                        <tr>
                          <th
                            scope="col"
                            class="text-center"
                          >
                            訂購日期
                          </th>
                          <th
                            scope="col"
                            class="text-center"
                          >
                            訂單編號
                          </th>
                          <th
                            scope="col"
                            class="text-center"
                          >
                            付款方式
                          </th>
                          <th
                            scope="col"
                            class="text-center"
                          >
                            應付金額
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center">
                          {el.order_date}
                          </td>
                          <td class="text-center red">
                            {el.order_sid}
                          </td>
                          <td class="text-center">
                            {el.delivery}
                          </td>
                          <td class="text-center">
                            {el.orderprice}
                          </td>
                        </tr>
                        <div></div>
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })
          : ''}
        <div class="row justify-content-center ">
          <div class="borderstyle w875">
            <div class="row justify-content-center">
              <div class="borderstyle w875">
                <table class="table  col ">
                  <thead class="">
                    <tr>
                      <th scope="col">商品資訊</th>
                      <th scope="col" class="text-center">
                        商品數量
                      </th>
                      <th scope="col" class="text-center">
                        商品單價
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="d-flex">
                        <div>
                          <img src="./img/pd.jpg" alt="" />
                        </div>
                        <div class="ml-5">
                          Bumblebee Cans{' '}
                          <p class="size"> 黃 over 100cm</p>
                        </div>
                      </td>
                      <td class="text-center">1</td>
                      <td class="text-center">$99</td>
                    </tr>
                    <tr>
                      <td class="d-flex">
                        <div>
                          <img src="./img/pd.jpg" alt="" />
                        </div>
                        <div class="ml-5">
                          Bumblebee Cans
                          <p class="size"> 黃 over 100cm</p>
                        </div>
                      </td>
                      <td class="text-center">1</td>
                      <td class="text-center">$99</td>
                    </tr>
                    <tr>
                      <td class="d-flex">
                        <div>
                          <img src="./img/pd.jpg" alt="" />
                        </div>
                        <div class="ml-5">
                          Bumblebee Cans
                          <p class="size"> 黃 over 100cm</p>
                        </div>
                      </td>
                      <td class="text-center">1</td>
                      <td class="text-center">$99</td>
                    </tr>
                    <div></div>
                  </tbody>
                </table>
                <div class="borderbottom"></div>
                <div class="d-flex justify-content-end mt-5  ">
                  <div class="rongsettotal mr-5 "></div>
                  <div class="rongsettotal2 mr-5 pr-5">
                    <p>總金額</p>
                    <p>運費</p>
                    <p>購物金</p>
                    <p>
                      <span>應付金額</span>
                    </p>
                  </div>
                  <div class="rongsettotal2 mr-4 pr-5 pb-4">
                    <p>NT.298</p>
                    <p>NT.0</p>
                    <p>NT.0</p>
                    <p>
                      <span>NT.298</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mt-5 pt-4">
          <div class="row justify-content-center ">
            <button class="btn">
              <span>返回</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
    </>
  )
}

export default withRouter(OrderList)
