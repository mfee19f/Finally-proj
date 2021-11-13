import React, { useEffect, useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import './cartstyle.css'
// import dayjs from 'dayjs'
function OrderListJOIN(props) {
  const [data, setData] = useState({})
  const [singleData, setSingleData] = useState({})

  useEffect(() => {
    ;(async () => {
      const id = props.match.params.id

      if (id) {
        const r = await fetch(
          'http://localhost:3001/order/getlist/' + id
        )
        let obj = await r.json()
        let order = obj.data.reduce(function (r, a) {
          r[a.order_sid] = r[a.order_sid] || []
          r[a.order_sid].push(a)
          return r
        }, Object.create(null))
        await setData(order)
      }
    })()
  }, [props.match.params.id])

  const test = () => {
    for (let key in data) {
      console.log(
        'data[key]data[key]data[key]data[key]',
        data[key]
      )

      return (
        <>
          {data[0]
            ? data[key]((el, i) => {
                return (
                  <>
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Accordion.Toggle
                          as={Card.Header}
                          eventKey="0"
                        >
                          <div className="">
                            訂單編號 :{' '}
                            <span class="red">
                              {el.name}
                            </span>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <table className="table table-bordered col ">
                              <thead className="">
                                <tr>
                                  <th
                                    scope="col"
                                    className="text-center"
                                  >
                                    訂購日期
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center"
                                  >
                                    訂單編號
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center"
                                  >
                                    付款方式
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center"
                                  >
                                    應付金額
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="text-center">
                                    {dayjs(
                                      el.order_date
                                    ).format('YYYY-MM-DD')}
                                  </td>
                                  <td className="text-center red">
                                    {el.order_sid}
                                  </td>
                                  <td className="text-center">
                                    {el.delivery}
                                  </td>
                                  <td className="text-center">
                                    {el.orderprice}
                                  </td>
                                </tr>
                                <div></div>
                              </tbody>
                            </table>
                            {/* 相同訂單不同商品 */}
                            <table className="table  col ">
                              <thead className="">
                                <tr>
                                  <th scope="col">
                                    商品資訊
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center"
                                  >
                                    商品數量
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-center"
                                  >
                                    商品單價
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="d-flex">
                                    <div>
                                      <img
                                        src={
                                          'http://localhost:3001/img/' +
                                          el.image
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-5">
                                      {el.name}
                                      <p className="size">
                                        {' '}
                                        {el.size}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    {el.quantity}
                                  </td>
                                  <td className="text-center">
                                    {el.price}
                                  </td>
                                </tr>
                                <div></div>
                              </tbody>
                            </table>
                            <div className="borderbottom"></div>
                            <div className="d-flex justify-content-end mt-5  ">
                              <div className="rongsettotal mr-5 "></div>
                              <div className="rongsettotal2 mr-5 pr-5">
                                <p>總金額</p>
                                <p>運費</p>
                                <p>購物金</p>
                                <p>
                                  <span>應付金額</span>
                                </p>
                              </div>
                              <div className="rongsettotal2 mr-4 pr-5 pb-4">
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
                    <div className="mt-5"></div>
                  </>
                )
              })
            : ''}
        </>
      )
    }
  }

  return (
    <>
      <div className="container mt-5 pt-4">
        <div className="row justify-content-center rongdash  ml-5 bo "></div>
        <div className="row justify-content-center   ml-5 pr-3">
          <div className="rongorderlist mr-5">
            <p className="mt-3">訂單查詢</p>
          </div>
        </div>
      </div>
      {test()}
      <div class="container mt-5 ">
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
