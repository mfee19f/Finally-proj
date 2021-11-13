import React, { useEffect, useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import './cartstyle.css'
// import dayjs from 'dayjs'
function OrderList(props) {
  const [data, setData] = useState({})
  const [singleData, setSingleData] = useState({})
  const [myList, setMyList] = useState([])
  const [totalMoney, setTotalMoney] = useState(0)

  const [myListDisplay, setmyListDisplay] = useState([])
  console.log(
    'datadatadatadatadatadatadatadatadata',
    myList
  )
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

        // console.log('obj================data', obj.data)
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
  function getListFromLocalStorage() {
    const newlist = localStorage.getItem('list') || '[]'
    setMyList(JSON.parse(newlist))
  }
  useEffect(() => {
    getListFromLocalStorage()
  }, [])
  //總價
  useEffect(() => {
    // myListDisplay運算
    let newmyListDisplay = []

    //尋找myListDisplay
    for (let i = 0; i < myList.length; i++) {
      //尋找myListDisplay中有沒有此myList[i].id
      //有找到會返回陣列成員的索引值
      //沒找到會返回-1
      const index = newmyListDisplay.findIndex(
        (value) => value.id === myList[i].id
      )
      //有的話就數量+1
      if (index !== -1) {
        //每次只有加1個數量
        //newmyListDisplay[index].amount++
        //假設是加數量的
        newmyListDisplay[index].amount += myList[i].amount
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...myList[i] }
        newmyListDisplay = [...newmyListDisplay, newItem]
      }
    }

    // console.log(newmyListDisplay)
    setmyListDisplay(newmyListDisplay)
  }, [myList])
  // 計算總價用的函式
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }
  return (
    <>
      <div className="container mt-5 pt-4">
        <div className="row justify-content-center rongdash   bo "></div>
        <div className="row justify-content-center   ml-5 pr-3">
          <div className="rongorderlist mr-5">
            <p className="mt-3">訂單查詢</p>
          </div>
        </div>
      </div>
      <div className="container mt-5 ">
        {data[0]
          ? data.map((el, i) => {
              return (
                <>
                  <Accordion defaultActiveKey="1">
                    <Card>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey="0"
                      className=" bg"

                      >
                        <div className="">
                          訂單編號 :{' '}
                          <span className="red">
                            {el.order_sid}
                          </span>
                        </div>
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body className="cardbg">
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
                          <table className="table  col ">
                            <thead className="">
                              <tr>
                                <th scope="col">商品</th>

                                <th
                                  scope="col"
                                  className="text-center"
                                >
                                  數量
                                </th>
                                <th
                                  scope="col"
                                  className="text-center"
                                >
                                  單價
                                </th>
                                <th
                                  scope="col"
                                  className="text-center"
                                >
                                  小計
                                </th>
                              </tr>
                            </thead>
                            {myList.map((item, i) => {
                              return (
                                <tbody>
                                  <tr>
                                    <td className="d-flex">
                                      <div>
                                        <img
                                          src={item.image}
                                          alt=""
                                        />
                                      </div>
                                      <div className="ml-5 mt-3">
                                        {item.name}
                                        <p className="size">
                                          {' '}
                                          {item.size}
                                        </p>
                                      </div>
                                    </td>

                                    <td className="text-center ">
                                      <div className="mt-4">
                                        {' '}
                                        {item.amount}
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <div className="mt-4">
                                        {' '}
                                        {item.price}
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <div className="mt-4">
                                        {' '}
                                        {item.price *
                                          item.amount}
                                      </div>
                                    </td>
                                  </tr>

                                  <div></div>
                                </tbody>
                              )
                            })}
                          </table>
                          <div className="borderbottom"></div>
                          <div className="d-flex justify-content-end mt-5  ">
                            <div className="rongsettotal mr-5 "></div>
                            <div className="rongsettotal2 mr-5 pr-5">
                              <p>總金額</p>
                              <p>運費</p>

                              <p>
                                <span>應付金額</span>
                              </p>
                            </div>
                            <div className="rongsettotal2 mr-4 pr-5 pb-4">
                              <p>{sum(myListDisplay)}</p>
                              <p>NT.200</p>

                              <p>
                                <span>
                                  NT.
                                  {sum(myListDisplay) + 200}
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
        <Accordion defaultActiveKey="1">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0" className=" bg">
              <div className="">
                訂單編號 :{' '}
                <span className="red">202111100698</span>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="cardbg">
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
                        2021-11-10
                      </td>
                      <td className="text-center red">
                        202111100698
                      </td>
                      <td className="text-center">
                        宅配到貨付款{' '}
                      </td>
                      <td className="text-center">30300</td>
                    </tr>
                    <div></div>
                  </tbody>
                </table>

                <table className="table  col ">
                  <thead className="">
                    <tr>
                      <th scope="col">商品</th>

                      <th
                        scope="col"
                        className="text-center"
                      >
                        數量
                      </th>
                      <th
                        scope="col"
                        className="text-center"
                      >
                        單價
                      </th>
                      <th
                        scope="col"
                        className="text-center"
                      >
                        小計
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="d-flex">
                        <div>
                          <img
                            src="http://localhost:3000/image/LES SENTEURS DU PARADIS.jpeg"
                            alt=""
                          />
                        </div>
                        <div className="ml-5 mt-3">
                          LES SENTEURS DU PARADIS
                          <p className="size"> 25*25cm</p>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mt-4">1</div>
                      </td>
                      <td className="text-center">
                        <div className="mt-4">$9800</div>
                      </td>
                      <td className="text-center">
                        <div className="mt-4">$9800</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="d-flex">
                        <div>
                          <img
                            src="http://localhost:3000/image/APACHE MUSIC.jpeg"
                            alt=""
                          />
                        </div>
                        <div className="ml-5">
                          APACHE MUSIC
                          <p className="size">70*40cm</p>
                        </div>
                      </td>
                      <td className="text-center">1</td>
                      <td className="text-center">
                        $12500
                      </td>
                      <td className="text-center">
                        $12500
                      </td>
                    </tr>
                    <tr>
                      <td className="d-flex">
                        <div>
                          <img
                            src="http://localhost:3000/image/TIME SQUARE.jpeg"
                            alt=""
                          />
                        </div>
                        <div className="ml-5">
                          TIME SQUARE{' '}
                          <p className="size"> 54*45cm </p>
                        </div>
                      </td>
                      <td className="text-center">2</td>
                      <td className="text-center">$3900</td>
                      <td className="text-center">$7800</td>
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

                    <p>
                      <span>應付金額</span>
                    </p>
                  </div>
                  <div className="rongsettotal2 mr-4 pr-5 pb-4">
                    <p>NT.30100</p>
                    <p>NT.200</p>

                    <p>
                      <span>NT.30300</span>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <div className="container mt-5 pt-4">
          <div className="row justify-content-center ">
            <button
              className="btn bg-primary "
              onClick={() => {
                props.history.push('/')
              }}
            >
              <span className="white">返回首頁</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
    </>
  )
}

export default withRouter(OrderList)
