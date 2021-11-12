import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/Product.css'
import {
  Carousel,
  Form,
  FormControl,
} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { CONNECT2 } from '../road'
import { IMG_PATH } from '../road'

function Product(props) {
  const { setTrack, setCartCount } = props
  const [data, setData] = useState({})
  const [displayData, setDisplayData] = useState({})
  const [keyWord, setKeyWord] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  // {
  //   id: '1',
  //   image: 'BUY ! MINI.jpeg',
  //   name: 'BUY ! MINI',
  //   painter: 'DAVID KRACOV',
  //   price: 4800,
  //   tags: 'papercuts',
  //   track: 'false',
  //   created_at: '2021.10.26 22:00:00',
  //   page: 1,
  // },
  useEffect(() => {
    // 問伺服器是否有會員登入
    // 如果有登入，設定auth為true
    //setAuth(true)
    //請localstorage中的購物車數量
    const myCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : []
    const myTrack = localStorage.getItem('track')
      ? JSON.parse(localStorage.getItem('track'))
      : []
    // 設定為陣列的長度(成員數量)
    setTrack(myTrack.length)
    setCartCount(myCart.length)
  }, [])

  useEffect(() => {
    ;(async () => {
      const r = await fetch(CONNECT2)
      const obj = await r.json()
      await setData(obj)
      await setDisplayData(obj)
    })()
  }, [])

  const handleSearch = (MyData, keyWord) => {
    let newData = []

    if (keyWord) {
      newData = MyData.filter((d) => {
        // includes -> String API
        return d.name.includes(keyWord)
      })
    } else {
      newData = [...MyData]
    }

    return newData
  }
  const handlePage = (MyData, pageNumber) => {
    let newData = [...MyData]

    newData = [...MyData].filter((d) => {
      return d.page === pageNumber
    })
    return newData
  }
  const handleSort = (MyData, sortBy) => {
    let newData = [...MyData]

    // 以價格排序-由少至多
    if (sortBy === '1') {
      newData = [...newData].sort(
        (a, b) => a.price - b.price
      )
    }
    // 以價格排序-由多至少
    if (sortBy === '2') {
      newData = [...newData].sort(
        (a, b) => b.price - a.price
      )
    }
    // 預設用id 小至大
    if (sortBy === '' && newData.length > 0) {
      newData = [...newData].sort((a, b) => a.id - b.id)
    }
    return newData
  }

  useEffect(() => {
    let newData = []
    if (!data.rows) {
      return
    }
    const MyData = data.rows
    newData = handleSearch(MyData, keyWord)
    newData = handlePage(newData, pageNumber)
    newData = handleSort(newData, sortBy)
    setDisplayData({
      ...data,
      rows: newData,
      totalPages: new Array(
        Math.ceil(newData.length / 9)
      ).fill(0),
      totalPages1: Math.ceil(newData.length / 9),
    })
  }, [data, pageNumber, keyWord, sortBy])

  return (
    <>
      {/* 輪播牆 */}
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./image/p1.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3></h3>
            <p></p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./image/p2.jpeg"
            alt="Second slide"
          />

          <Carousel.Caption>
            {/* <h3></h3>
            <p></p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./image/p3.jpeg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3></h3>
            <p></p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <!-- 推薦商品字串列 --> */}
      <div className="container">
        <div className="row  ">
          <div className="col sorting">
            <div className="sorting-op">推薦商品</div>
            {/* <DropdownButton
              id="dropdown-basic-button"
              title="排序"
            >
              <Dropdown.Item
                href="#/action-1"
                id="rocky-order"
                value=""
                onChange={(e) => setSortBy(e.target.value)}
              >
                最新上架
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-2"
                id="rocky-order"
                value="1"
                onChange={(e) => setSortBy(e.target.value)}
              >
                價格由低到高
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                id="rocky-order"
                value="2"
                onChange={(e) => setSortBy(e.target.value)}
              >
                價格由高到低
              </Dropdown.Item>
            </DropdownButton> */}
          </div>
        </div>
      </div>
      {/* 搜尋欄 */}
      <div className="container">
        <div className="row">
          <div className="col rocky-search">
            <div>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2 rocky-little"
                  value={keyWord}
                  onChange={(e) => {
                    setKeyWord(e.target.value)
                  }}
                />
                {/* <Button
                  variant="outline-dark"
                  className="rocky-button"
                >
                  <div className="rocky-search">Search</div>
                </Button> */}
              </Form>
            </div>
            {/* 排序 */}
            <div className="btn-group">
              <select
                className="form-select form-select-sm  rocky-order"
                aria-label=".form-select-sm example"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">請選擇排序</option>
                <option value="1">
                  以價格排序-由少至多
                </option>
                <option value="2">
                  以價格排序-由多至少
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- 推薦商品 --> */}
      <div className="container">
        <div className="row">
          {displayData.rows
            ? displayData.rows.map((v, i) => {
                return (
                  <div
                    className="col-12 col-sm-6 col-md-4"
                    key={i}
                  >
                    <div className="card card-color top-space">
                      <div data-aos="zoom-in">
                        <Link
                          to={'/product/detail/' + v.sid}
                        >
                          <img
                            src={IMG_PATH + '/' + v.image}
                            className="card-img-top"
                            alt="..."
                          />
                        </Link>
                        <div className="card-body bottom-space">
                          <div className="card-text name-large">
                            {v.name}
                          </div>
                          <div className="card-text">
                            {v.painter}
                          </div>
                          <div className="card-text">
                            NT$ {v.price}
                          </div>
                          <i className="fas fa-shopping-cart cart-color"></i>
                          <span className="rocky-love">
                            123
                          </span>
                          <i className="fas fa-heart cart-color"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            : ''}
        </div>
      </div>
      {/* <!-- 分頁按鈕 --> */}
      <div className="container">
        <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination rocky-page">
              {/* 向上一頁 */}
              <li
                className={
                  pageNumber === 1
                    ? 'page-item disabled'
                    : 'page-item'
                }
              >
                <Link
                  to={'/product'}
                  className="page-link"
                  onClick={() => {
                    setPageNumber(pageNumber - 1)
                  }}
                >
                  Previous
                </Link>
              </li>
              {/* 當前頁面 */}
              {data.totalPages
                ? data.totalPages.map((v, i) => {
                    return (
                      <li
                        className={
                          { pageNumber } === { i }
                            ? 'page-item active'
                            : 'page-item'
                        }
                        key={i}
                      >
                        <Link
                          to={'/product'}
                          className="page-link"
                          onClick={() => {
                            setPageNumber(i + 1)
                          }}
                        >
                          {i + 1}
                        </Link>
                      </li>
                    )
                  })
                : ''}
              {/* 向後一頁 */}
              <li
                className={
                  pageNumber === data.totalPages1
                    ? 'page-item disabled'
                    : 'page-item'
                }
              >
                <Link
                  to={'/product'}
                  className="page-link"
                  onClick={() => {
                    setPageNumber(pageNumber + 1)
                  }}
                >
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* <!-- 商品分類字串列 --> */}
      <div className="container">
        <div className="row  ">
          <div className="col sorting">
            <div className="sorting-op">商品分類</div>
            <div className="sorting-op"></div>
          </div>
        </div>
      </div>
      {/* <!-- 商品分類 --> */}
      <div className="container">
        <div className="row">
          {/* <!-- 紙雕 --> */}
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space">
              <img
                src="./image/category.jpeg"
                className="card-img-top category"
                alt="..."
              />
              <div className="card-body bottom-space category-word">
                <div className="card-text name-large category-bigtext">
                  紙雕
                </div>
                <div className="card-text category-smalltext">
                  PAPERCUTS
                </div>
                <button
                  type="button"
                  className="btn btn-dark btn-color"
                >
                  點我看更多
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <Link to="/product/detail">
                <img
                  src="./image/LA MARIEE DU CIEL.jpeg"
                  className="card-img-top"
                  alt="..."
                />
              </Link>
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  LA MARIEE DU CIEL
                </div>
                <div className="card-text">
                  YOEL BENHARROUCHE
                </div>
                <div className="card-text">NT$ 2000</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/MAKING LOVE- BLACK.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  MAKING LOVE- BLACK
                </div>
                <div className="card-text">
                  DAVID KRACOV
                </div>
                <div className="card-text">NT$ 1750</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          {/* <!-- 繪畫 --> */}
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space">
              <img
                src="./image/category.jpeg"
                className="card-img-top category"
                alt="..."
              />
              <div className="card-body bottom-space category-word">
                <div className="card-text name-large category-bigtext">
                  繪畫
                </div>
                <div className="card-text category-smalltext">
                  PAINTING
                </div>
                <button
                  type="button"
                  className="btn btn-dark btn-color"
                >
                  點我看更多
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/BLACK NOTES.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  BLACK NOTES
                </div>
                <div className="card-text">
                  CALMAN SHEMI
                </div>
                <div className="card-text">NT$ 6400</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/INDIAN BOWIE.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  INDIAN BOWIE
                </div>
                <div className="card-text">CLEM$</div>
                <div className="card-text">NT$ 12500</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          {/* <!-- 攝影作品 --> */}
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space">
              <img
                src="./image/category.jpeg"
                className="card-img-top category"
                alt="..."
              />
              <div className="card-body bottom-space category-word">
                <div className="card-text name-large category-bigtext">
                  攝影
                </div>
                <div className="card-text category-smalltext">
                  PHOTOGRAPHY
                </div>
                <button
                  type="button"
                  className="btn btn-dark btn-color"
                >
                  點我看更多
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/RAINBOW DUST DELIRIUM.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  RAINBOW DUST DELIRIUM
                </div>
                <div className="card-text">
                  JONAS LERICHE
                </div>
                <div className="card-text">NT$ 4000</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/CIRCLE OF LIFE.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  CIRCLE OF LIFE
                </div>
                <div className="card-text">
                  JONAS LERICHE
                </div>
                <div className="card-text">NT$ 5400</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          {/* <!-- 卡片 --> */}
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space">
              <img
                src="./image/category.jpeg"
                className="card-img-top category"
                alt="..."
              />
              <div className="card-body bottom-space category-word">
                <div className="card-text name-large category-bigtext">
                  漆畫
                </div>
                <div className="card-text category-smalltext">
                  LACQUERS ON METAL
                </div>
                <button
                  type="button"
                  className="btn btn-dark btn-color"
                >
                  點我看更多
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/FLOWER FIELD - SILVER.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  FLOWER FIELD - SILVER
                </div>
                <div className="card-text">
                  CALMAN SHEMI
                </div>
                <div className="card-text">NT$ 7400</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/PARTAGE.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  PARTAGE
                </div>
                <div className="card-text">
                  YOEL BENHARROUCHE
                </div>
                <div className="card-text">NT$ 8600</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          {/* <!-- 擺飾 --> */}
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space">
              <img
                src="./image/category.jpeg"
                className="card-img-top category"
                alt="..."
              />
              <div className="card-body bottom-space category-word">
                <div className="card-text name-large category-bigtext">
                  擺飾
                </div>
                <div className="card-text category-smalltext">
                  DECORATIONS
                </div>
                <button
                  type="button"
                  className="btn btn-dark btn-color"
                >
                  點我看更多
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/GOLDEN EGG TEAM.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  GOLDEN EGG TEAM
                </div>
                <div className="card-text">
                  KUNST MET EEN R
                </div>
                <div className="card-text">NT$ 4100</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/MUSICAL LEGO.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  MUSICAL LEGO
                </div>
                <div className="card-text">
                  HAREL JOSEFSON
                </div>
                <div className="card-text">NT$ 1800</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          {/* <!-- 其它 --> */}
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space">
              <img
                src="./image/category.jpeg"
                className="card-img-top category"
                alt="..."
              />
              <div className="card-body bottom-space category-word">
                <div className="card-text name-large category-bigtext">
                  其它
                </div>
                <div className="card-text category-smalltext">
                  OTHERS
                </div>
                <button
                  type="button"
                  className="btn btn-dark btn-color"
                >
                  點我看更多
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/THINKING OUTSIDE THE BOX - COMICS.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  THINKING OUTSIDE THE BOX - COMICS
                </div>
                <div className="card-text">
                  DAVID KRACOV
                </div>
                <div className="card-text">NT$ 4900</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 ">
            <div className="card card-color top-space cart-bottom">
              <img
                src="./image/TRANSFORMERS CANS.jpeg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body bottom-space">
                <div className="card-text name-large">
                  TRANSFORMERS CANS
                </div>
                <div className="card-text">GUMM</div>
                <div className="card-text">NT$ 7500</div>
                <i className="fas fa-shopping-cart cart-color"></i>
                <span className="rocky-love">123</span>
                <i className="fas fa-heart cart-color"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Product)
