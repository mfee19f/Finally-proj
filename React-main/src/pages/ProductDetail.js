import { withRouter, Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import MultiLevelBreadCrumb from '../components/MultiLevelBreadCrumb'
import '../styles/ProductDetail.css'
import { useEffect, useState } from 'react'
import { CONNECT4 } from '../road'
import { IMG_PATH } from '../road'

function ProductDetail(props) {
  // console.log(props)
  const {
    cartCount,
    setCartCount,
    buyNumber,
    setBuyNumber,
    track,
    setTrack,
  } = props
  const [data, setData] = useState({})
  const [displayData, setDisplayData] = useState({})
  const [pageNumber, setPageNumber] = useState(1)
  const [singleData, setSingleData] = useState({})
  const [mycart, setMycart] = useState([])
  const [show, setShow] = useState(false)
  const [productName, setProductName] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const updateCartToLocalStorage = (value) => {
    const currentCart =
      JSON.parse(localStorage.getItem('cart')) || []
    const newCart = [...currentCart, value]
    localStorage.setItem('cart', JSON.stringify(newCart))
    // 設定資料
    setMycart(newCart)
    setProductName(value.name)
    handleShow()
  }
  const [mylist, setList] = useState([])
  const updateCartListToLocalStorage = (value) => {
    const newList =
      JSON.parse(localStorage.getItem('list')) || []
    const newCart = [...newList, value]
    localStorage.setItem('list', JSON.stringify(newCart))
    // 設定資料
    setList(newCart)
    handleShow()
  }

  useEffect(() => {
    ;(async () => {
      const id = props.match.params.id
      // console.log(id)
      if (id) {
        const r = await fetch(CONNECT4 + id)
        const obj = await r.json()
        await setSingleData(obj.data)
      } else {
        const r = await fetch(CONNECT4 + 3)
        const obj = await r.json()
        await setSingleData(obj.data)
      }
    })()
  }, [props.match.params.id])

  useEffect(() => {
    ;(async () => {
      let query = '?page=' + parseInt(pageNumber)
      // console.log(query)
      let link =
        'http://localhost:3001/product/findsix/' + query
      // console.log(link)
      const r = await fetch(link)
      // console.log(link)
      const obj = await r.json()
      await setData(obj)
      await setDisplayData(obj)
    })()
  }, [pageNumber])
  // console.log(pageNumber)
  // console.log(singleData.sid)

  const messageModal = (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>加入購物車訊息</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        產品：{productName} 已成功加入購物車
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <span className="rocky-fix">繼續購物</span>
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.history.push('/order-steps')
          }}
        >
          前往購物車結帳
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const display = (
    <>
      {/* 麵包屑 */}
      <div className="container">
        <div className="row">
          <MultiLevelBreadCrumb />
        </div>
      </div>
      <div className="rocky-center">
        {/* <!-- 商品圖 --> */}
        <div className="wrap-img">
          <img
            src={
              singleData.image
                ? IMG_PATH + '/' + singleData.image
                : IMG_PATH + '/AMBER SPLASH COCO.jpeg'
            }
            alt=""
            width="100%"
          />
        </div>
        {/* <!-- 右側資訊欄 --> */}
        <div className="big-wrap">
          <div className="product-name">
            <div className="name rocky-color">
              {singleData.name}
            </div>
            <div className="designer rocky-color">
              {singleData.painter}
            </div>
          </div>
          <div className="product-size">
            <div className="rocky-category rocky-color">
              分類：{singleData.tags}
            </div>
            <div className="rocky-size rocky-color">
              尺寸：{singleData.size}
            </div>
            <div className="rocky-price rocky-color">
              單價：NT$ {singleData.price}
            </div>
          </div>
          <div className="product-num">
            <div className="rocky-num rocky-color">
              數量：
              <div className="rocky-buy">{buyNumber}</div>
              <div className="rocky-UD">
                <div
                  className="rocky-add"
                  onClick={() => {
                    setBuyNumber(
                      buyNumber === 3 ? 3 : buyNumber + 1
                    )
                  }}
                >
                  <i className="far fa-caret-square-up"></i>
                </div>
                <div
                  className="rocky-reduce"
                  onClick={() => {
                    setBuyNumber(
                      buyNumber < 2 ? 1 : buyNumber - 1
                    )
                  }}
                >
                  <i className="far fa-caret-square-down"></i>
                </div>
              </div>
            </div>
            <div className="total-price rocky-color">
              總價：NT$ {singleData.price * buyNumber}
            </div>
          </div>
          <div className="shopping-btn">
            <button
              type="button"
              className="btn btn-dark btn-lg rocky-in"
              onClick={() => {
                updateCartToLocalStorage({
                  id: singleData.sid,
                  name: singleData.name,
                  amount: buyNumber,
                  price: singleData.price,
                  size: singleData.size,
                  image: IMG_PATH + '/' + singleData.image,
                })
                updateCartListToLocalStorage({
                  id: singleData.sid,
                  name: singleData.name,
                  amount: buyNumber,
                  price: singleData.price,
                  size: singleData.size,
                  image: IMG_PATH + '/' + singleData.image,
                })
                // 每次一按加入，選單列購物數量+1
                setCartCount(cartCount + 1)
              }}
            >
              加入購物車
            </button>
          </div>
          <div className="shopping-btn2">
            <button
              type="button"
              className="btn btn-light btn-lg rocky-debt rocky-color"
              onClick={() => {
                const myTrack = localStorage.getItem(
                  'track'
                )
                  ? JSON.parse(
                      localStorage.getItem('track')
                    )
                  : []
                const newMyTrack = [...myTrack, singleData]
                // console.log([...myTrack, singleData])
                if (myTrack[0]) {
                  // 如何讓singleData.sid不會跟e.sid重複
                  // 關鍵在於myTrack裡面不能有singleData
                  for (let e of myTrack) {
                    if (e.sid === singleData.sid) {
                      return
                    }
                  }
                  localStorage.setItem(
                    'track',
                    JSON.stringify(newMyTrack)
                  )
                  setTrack(track + 1)
                } else {
                  localStorage.setItem(
                    'track',
                    JSON.stringify(newMyTrack)
                  )
                  setTrack(track + 1)
                }
              }}
            >
              <i className="far fa-heart"></i> 加入追蹤
            </button>
          </div>
          <div className="product-note">
            <div className="shipping-day rocky-color">
              ※基本工作日：D+10日，視商品體裁及尺寸增減工作日
            </div>
            <div className="shipping-area rocky-color">
              配送地區：臺灣與離島
            </div>
          </div>
        </div>
      </div>
      {/* 下方推薦欄 */}
      <div className="container">
        <div className="row">
          <div className="mini-pic">
            <div className="recommand rocky-color">
              為您推薦 <a href="/#">點我看更多</a>
            </div>
            <div className="rocky-wrap">
              <div className="arrow-center rocky-left">
                <span
                  // to={'/product/detail'}
                  // className="page-link"
                  onClick={() => {
                    pageNumber < 2
                      ? setPageNumber(data.totalPages)
                      : setPageNumber(pageNumber - 1)
                  }}
                >
                  <i className="fas fa-caret-square-left rocky-angle"></i>
                </span>
              </div>
              <div className="container">
                <div className="row">
                  {displayData.rows
                    ? displayData.rows.map((v, i) => {
                        return (
                          <div
                            className="col-12 col-sm-6 col-md-4 col-lg-2"
                            key={i}
                          >
                            <div className="card card-color top-space">
                              <div data-aos="zoom-in">
                                <Link
                                  to={
                                    '/product/detail/' +
                                    v.sid
                                  }
                                >
                                  <img
                                    src={
                                      IMG_PATH +
                                      '/' +
                                      v.image
                                    }
                                    className="card-img-top"
                                    alt="..."
                                  />
                                </Link>
                                <div className="card-body bottom-space rocky-last">
                                  <div className="card-text name-large rocky-last">
                                    {v.name}
                                  </div>
                                  <div className="card-text rocky-last">
                                    NT$ {v.price}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    : ''}
                </div>
              </div>
              <div className="arrow-center disabled">
                <span
                  // to={'/product/detail'}
                  // className="page-link"
                  onClick={() => {
                    pageNumber === data.totalPages
                      ? setPageNumber(1)
                      : setPageNumber(pageNumber + 1)
                  }}
                >
                  <i className="fas fa-caret-square-right rocky-angle"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {messageModal}
      {display}
    </>
  )
}

export default withRouter(ProductDetail)
