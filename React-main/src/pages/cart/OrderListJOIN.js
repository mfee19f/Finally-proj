import React, { useEffect, useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import './cartstyle.css'
// import dayjs from 'dayjs'
function OrderListJOIN(props) {
  const [data, setData] = useState({})
  const [singleData, setSingleData] = useState({})
  console.log(
    'datadatadatadatadatadatadatadatadata',
    data[0]
  )
  console.log(
    'datadatadatadatadatadatadatadatadata11111111111111111111',
    data[1]
  )
  useEffect(() => {
    ;(async () => {
      const id = props.match.params.id

      if (id) {
        const r = await fetch(
          'http://localhost:3001/order/getlist/' + id
        )
        const obj = await r.json()

        await setData(obj.data)
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
              let id = 0
              if (id == 0) {
                id = el.order_sid
              }

              if (id != el.order_sid) {
                return (
                  <>
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="0"
                        >
                          <div class="">
                            訂單編號 :{' '}
                            <span class="red">
                              {el.order_sid}
                            </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
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
                                    {dayjs(
                                      el.order_date
                                    ).format('YYYY-MM-DD')}
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
                            {/* 相同訂單不同商品 */}
                            <table class="table  col ">
                              <thead class="">
                                <tr>
                                  <th scope="col">
                                    商品資訊
                                  </th>
                                  <th
                                    scope="col"
                                    class="text-center"
                                  >
                                    商品數量
                                  </th>
                                  <th
                                    scope="col"
                                    class="text-center"
                                  >
                                    商品單價
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="d-flex">
                                    <div>
                                      <img
                                        src={
                                          'http://localhost:3001/img/' +
                                          el.image
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <div class="ml-5">
                                      {el.name}
                                      <p class="size">
                                        {' '}
                                        {el.size}
                                      </p>
                                    </div>
                                  </td>
                                  <td class="text-center">
                                    {el.quantity}
                                  </td>
                                  <td class="text-center">
                                    {el.price}
                                  </td>
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
                                <p>NT.{el.orderprice}</p>
                                <p>NT.0</p>
                                <p>NT.0</p>
                                <p>
                                  <span>
                                    NT.{el.orderprice}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                    <div class="mt-5"></div>
                  </>
                )
              } else {
              }
            })
          : ''}

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

export default withRouter(OrderListJOIN)